"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

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
      identityNumber: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Identity Number must be filled!",
          },
          len: {
            args: [16, 20],
            msg:
              "Identity Number minimum 16 characters and maximum 20 characters",
          },
          isUnique(value, next) {
            const current = this;
            Customer.findOne({
              where: {
                identityNumber: value,
                // id: {
                //   [Op.ne] : current.id
                // },
                fullName: {
                  [Op.ne] : current.fullName
                },
                address: {
                  [Op.ne] : current.address
                },
                
              },
            })
              .then((result) => {
                // console.log(current, "========== this is current id")
                // console.log(result.id, "========== this is result id")
                // console.log(result, "========== this is result");
                if (result) return next ("Duplicate Identity Number");
                return next();
              })
              .catch((err) => {
                return next(err);
              });
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Full name must be filled",
          },
        },
      },
      address: DataTypes.STRING,
      birthDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Birth Date must be filled",
          },
        },
      },
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
