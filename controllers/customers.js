const { Customer, Account } = require("../models");
const { Op } = require("sequelize");
const dateFormat = require("../helpers/dateFormat");
class CustomerController {
  static customerList(req, res) {
    Customer.findAll({
      include: Account,
      order: [["fullName", "DESC"]],
    })
      .then((customerList) => {
        res.render("customerList", { customerList });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static addCustomerGet(req, res) {
    res.render("register");
  }

  static addCustomerPost(req, res) {
    const newCustomer = req.body;
    Customer.create(newCustomer)
      .then((success) => {
        res.redirect("/customers");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static editCustomerGet(req, res) {
    const id = +req.params.idCustomer;
    Customer.findByPk(id)
      .then((customerData) => {
        res.render("editProfile", { customerData, dateFormat });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static editCustomerPost(req, res) {
    const id = +req.params.idCustomer;
    const updatedData = req.body;
    Customer.update(updatedData, {
      where: {
        id,
      },
    })
      .then((success) => {
        res.redirect("/customers");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static customerAccountsGet(req, res) {
    const id = +req.params.idCustomer;
    Customer.findByPk(id, {
      include: Account,
    })
      .then((customerData) => {
        res.render("customerAccounts", { customerData });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static customerAccountsPost(req, res) {
    const CustomerId = +req.params.idCustomer;
    Account.create({
      type: req.body.type,
      balance: req.body.balance,
      CustomerId,
    })
      .then((success) => {
        res.redirect(`/customers/${CustomerId}/accounts`);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static transferAccountsGet(req, res) {
    const AccountId = +req.params.idAccount;
    let accounts = [];
    Account.findAll({
      where: {
        id: {
          [Op.ne]: AccountId,
        },
      },
      include: Customer,
    })
      .then((result) => {
        accounts = result;
        return Account.findByPk(AccountId);
      })
      .then((accountData) => {
        res.render("transfer", { accountData, accounts });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static transferAccountsPost(req, res) {
    const transferToAccountId = +req.body.transferToAccountId;
    const amount = +req.body.amount;
    const CustomerId = +req.params.idCustomer;
    const AccountId = +req.params.idAccount;

    Account.findByPk(AccountId).then((senderAccount) => {
      console.log(senderAccount.balance, "===== ini balance sender");
      console.log(amount, "===== ini amount nya");
      console.log(senderAccount.verifyBalance(amount), "===== ini fungsinya");
      if (!senderAccount.verifyBalance(amount)) {
        res.send("Insufficient balance");
      } else {
        return Account.decrement("balance", {
          by: amount,
          where: {
            id: AccountId,
          },
        })
          .then((success) => {
            return Account.findByPk(transferToAccountId);
          })
          .then((destinationAccount) => {
            return Account.increment("balance", {
              by: amount,
              where: {
                id: destinationAccount.id,
              },
            });
          })
          .then((success) => {
            res.redirect(`/customers/${CustomerId}/accounts`);
          })
          .catch((err) => {
            res.send(err.message);
          });
      }
    });
  }
}

module.exports = CustomerController;
