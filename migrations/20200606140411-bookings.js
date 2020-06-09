"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
      },
      from: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          
          notEmpty: true
        }
      },
      
      to: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          
          notEmpty: true
        }
      },
    
      fare: {
    
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          
          notEmpty: true
        }
      
    
      },
    
      distance: {
    
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          
          notEmpty: true
        }
      },
    
      user_id:{
        type:Sequelize.INTEGER,
        references: {         
          model: 'users',
          key: 'id'
        }
      },
      driver_id:{
        type:Sequelize.INTEGER,
        references: {         
          model: 'drivers',
          key: 'id'
        }
      }
     
  }),
    

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.dropTable('bookings');
  },
};
