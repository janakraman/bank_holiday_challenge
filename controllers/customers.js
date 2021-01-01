class CustomerController {
  static customerList(req, res) {
    res.send("Customer List")
  }

  static addCustomerGet(req, res) {
    res.send("addCustomer")
  }
  
  static addCustomerPost(req, res) {
    res.send("addCustomer")
  }

  static editCustomerGet(req, res) {
    res.send("editCustomer")
  }

  static editCustomerPost(req, res) {
    res.send("editCustomer")
  }

  static customerAccountsGet(req, res) {
    res.send("customerAccounts")
  }

  static customerAccountsPost(req, res) {
    res.send("customerAccounts")
  }

  static transferAccountsGet(req, res) {
    res.send("transferAccounts")
  }
  
  static transferAccountsPost(req, res) {
    res.send("transferAccounts")
  }

}

module.exports = CustomerController;
