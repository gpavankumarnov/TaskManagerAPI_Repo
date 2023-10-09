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

app.get('/', authenticateToken, (req,res) => {

    console.log("running get function", req.user)
res.json(users.filter(user=> user.username === req.user.username))
})

// const refreshTokens = []

// app.post('/token', (req, res) => {
//     //passing refresh token as body which got from the login route.
//     const refreshToken = req.body.token;
//     if(refreshToken == null) return res.sendStatus(401)
//     if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user)=>{
//         if(err) return res.sendStatus(403)
//         const accessToken = generateToken({username : user.username})
//         res.json({accessToken: accessToken})
//     })
// })



console.log("ACCESS TOKEN IS", process.env.ACCESS_TOKEN_SECRET)
// let userDetails = {
   
//     username: 'gpavankumarnov@gmail.com',
//     pwd: "INDia999$"
// }
app.post('/login', (req, res) => {
    const userDetails = {...req.body}
    console.log("request body is", userDetails)
    const accessToken = generateToken(userDetails)
    // const refreshToken = jwt.sign(userDetails, process.env.REFRESH_TOKEN)
res.json({accessToken : accessToken})
})

const generateToken = (user) =>{
  return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'300s'})
}


function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token is", token)
     if(token == null) return res.sendStatus(401)
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403)
        }
            req.user = user
            next()
        
     })
}





app.listen(4000, ()=>{
    console.log(`Server is running at ${PORT}`);
})


