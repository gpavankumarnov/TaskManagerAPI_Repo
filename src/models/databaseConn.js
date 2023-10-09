 require('dotenv').config();
const { Pool } = require('pg'); // Import the Pool object
//Pool object extracted from the pg module.



//The new Pool() constructor creates an instance of the Pool object,
const poolConn = new Pool(
//   {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'TaskManagerApp',
//     password: 'INDia999$',
//     port: 5432,
//   }
{
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
  }
);



module.exports.poolConn = poolConn;
