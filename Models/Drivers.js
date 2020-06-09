const db = require("../database");
const Sequelize = require("sequelize");

const Drivers = db.define("drivers", {
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
 
},
{
  timestamps: false

});


db.sync()

module.exports = Drivers



