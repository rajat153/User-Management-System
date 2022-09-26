const express = require('express');
const app = express();
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const router = require('./server/routes/router')
const connectDB = require('./server/database/connection')



dotenv.config({path:"config.env"})
const PORT = process.env.PORT||5000


//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB()

//parse request to 
app.use(express.urlencoded({extended:true}))

//set view engine
app.set ('view engine','ejs')
app.set("views",path.join(__dirname,'views'))

//load assets
app.use(express.static(path.join(__dirname,'assets'))) //used for access static files from outside of directory




//load routers
app.use('/',router)

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON  PORT NO. http://localhost:${PORT}`)
})