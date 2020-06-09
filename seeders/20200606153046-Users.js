"use strict";
const usersDummy = require("../raw/users");

module.exports = {
  up: (queryInterface, Sequelize) => {
 

    return queryInterface.bulkInsert("users", usersDummy, {});
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete("users", null, {});
  },
};
