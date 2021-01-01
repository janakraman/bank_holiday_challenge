"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        identityNumber: "TC998953343029",
        fullName: "John Doe",
        address: "Ataturk Mh. Cankaya Sk. 44/10",
        birthDate: new Date("1995-03-25"),
        gender: "male",
      },
      {
        identityNumber: "TC998949393345",
        fullName: "Jane Doe",
        address: "Ataturk Mh. Cankaya Sk. 44/10",
        birthDate: new Date("1996-11-19"),
        gender: "female",
      },
    ];
    data.forEach((e) => {
      (e.createdAt = new Date()), (e.updatedAt = new Date());
    });
    return queryInterface.bulkInsert("Customers", data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
