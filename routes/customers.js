const customerRouter = require("express").Router();
const CustomerController = require("../controllers/customers");

customerRouter.get("/", CustomerController.customerList);
customerRouter.get("/register", CustomerController.addCustomerGet);
customerRouter.post("/register", CustomerController.addCustomerPost);
customerRouter.get("/:idCustomer/editProfile", CustomerController.editCustomerGet);
customerRouter.post("/:idCustomer/editProfile", CustomerController.editCustomerPost);
customerRouter.get("/:idCustomer/accounts", CustomerController.customerAccountsGet);
customerRouter.post("/:idCustomer/accounts", CustomerController.customerAccountsPost);
customerRouter.get("/:idCustomer/accounts/:idAccount/transfer", CustomerController.transferAccountsGet);
customerRouter.post("/:idCustomer/accounts/:idAccount/transfer", CustomerController.transferAccountsPost);



module.exports = customerRouter;
