const db = require("../database");
const Sequelize = require("sequelize");

const Users = db.define("users", {
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

}, 
 {
  timestamps: false,

});


db.sync()

module.exports = Users



// const Waiters = db.define('waiters', {
  
//   name: {
//     type: Sequelize.STRING
//   },
//   age: {
//     type: Sequelize.INTEGER
//   },
//   table_id:{
//     type:Sequelize.INTEGER,
//     references: {         
//       model: 'tables',
//       key: 'id'
//     }
//   }
 

// },
// {
//   timestamps: false,
//   underscored: true
// });

// Customers.belongsTo(Table);
// Table.hasMany(Customers);