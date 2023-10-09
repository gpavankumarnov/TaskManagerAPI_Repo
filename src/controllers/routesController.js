const {poolConn} = require('../models/databaseConn')
const queries = require('../db/sqlQuery')

const getTasks = (req, res) => {
    
    poolConn.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
     
    });
    
  };

  const addTasks = async(req, res) => {
    try{
    //res getting in parser manner.
    
    console.log(req.body)
    const {task, taskID,  status} = req.body
    console.log(task, taskID, status)
       const response = await queries.insertTask(task, taskID,  status);
       console.log(response)
       res.json();
    } catch(err){
      console.log(err);
      res.status(500).json({ error: 'An error occurred while adding the task.' });
  
    }
  }

  module.exports = {
    getTasks, addTasks
  }