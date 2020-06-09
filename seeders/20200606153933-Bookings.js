"use strict";
const bookingsDummy = require("../raw/bookings");
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert("bookings", bookingsDummy, {});
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete("bookings", null, {});
  },
};
