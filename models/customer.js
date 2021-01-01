"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Account);
    }
  }
  Customer.init(
    {
      identityNumber: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      accountNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
