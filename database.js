const Sequelize = require("sequelize");
const envVar = require("./config/envVar")
envVar();
// const {Table,Customers} = require('./Models/Table')
 
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD , {
 host: "postgresql-9165-0.cloudclusters.net",
 dialect: "postgres",
 port: 9165
});

// psql -h postgresql-9165-0.cloudclusters.net -p 9165 -U <UserName> -d <dbname>


// const db = new Sequelize(process.env.DB_NAME , process.env.DB_USERNAME, process.env.DB_PASSWORD , 
// {
//     host: "localhost",
//     dialect: "postgres"
//    });






module.exports = db;