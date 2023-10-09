const express = require('express')
const router = express.Router();
const control = require('../controllers/routesController.js')


router.get('/', control.getTasks);

router.post('/addTask', control.addTasks)


module.exports = router;

