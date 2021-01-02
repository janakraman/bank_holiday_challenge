"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer);
    }

    verifyBalance(amount) {
      if (this.balance < amount) return false;
      else return true;
    }

    formattedBalance() {
      return this.balance.toLocaleString("en-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  }
  Account.init(
    {
      type: DataTypes.STRING,
      balance: {
        type: DataTypes.FLOAT,
        validate: {
          min: {
            args: 500000,
            msg: "Minimum balance for new Account: Rp500.000",
          },
        },
      },
      CustomerId: DataTypes.INTEGER,
      accountNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );

  Account.beforeValidate((account, options) => {
    if (!account.balance && account.balance !== "0") account.balance = 500000;
  });

  Account.beforeCreate((account, options) => {
    account.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  });

  return Account;
};
