const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config()
const taskroutes = require('./routes/taskRoutes')


const PORT = 4000;
app.use(cors())
app.use(bodyParser.json())
app.use('/tasks', taskroutes)

const users = [
    {
        username:'pavan kumar',
        password : 'INDia999$',
        id:1
    },
    {
        username:'Ranjith',
        password : 'INDia999',
        id:2
    },
    {
        username:'Ramesh',
        password : 'INDia99999',
        id:3
    }
]

app.get('/', (req,res) => {
// console.log('request is', req)
//     console.log("running get function", req.body.username)
res.json(users.filter(user=> user.username === req.body.username))
})

const refreshTokens = []




const generateToken = (user) =>{
  return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'300s'})
}


// function authenticateToken(req,res,next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log("token is", token)
//      if(token == null) return res.sendStatus(401)
//      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err){
//             return res.sendStatus(403)
//         }
//             req.user = user
//             next()
        
//      })
// }





app.listen(4000, ()=>{
    console.log(`Server is running at ${PORT}`);
})


