"use strict";
const driversDummy = require("../raw/drivers");
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert("drivers", driversDummy, {});
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete("drivers", null, {});
  },
};
