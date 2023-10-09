const {poolConn} = require('../models/databaseConn')


//inserting new task
const insertTask = async (task, taskID,  status) => {
    const query = `INSERT INTO tasks (taskName, taskid, status) VALUES ('${task}', '${taskID}', '${status}' )`
    try {
        const result = await poolConn.query(query);
        console.log(result)
        return result;
      } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled in the calling function
      }

}


module.exports = {
    insertTask
}