'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  

   return queryInterface.createTable('users', {
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
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
        notEmpty: true
      } 
    },
    userName: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{ 
        notEmpty: true
      }
    },
  
  });
  },

  down: (queryInterface, Sequelize) => {
  
   return queryInterface.dropTable('users');
  }
};
