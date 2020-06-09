'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     
    */

   return queryInterface.createTable('drivers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        
        notEmpty: true
      }
    },
    
    numberPlate: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        notEmpty: true
      }
    },
    location: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        notEmpty: true
      }
    },
   
  })
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.dropTable('drivers');
  }
};
