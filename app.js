// npm i express lodash numeral moment dotenv ejs cors mysql2 sequelize passport uuid multer http-errors express-session helmet morgan

/*************** global init *****************/
require('dotenv').config()
const port = process.env.PORT
const path = require('path')
const express = require('express')
const app = express()


/*************** server init  *****************/
app.listen(port, () => console.log('http://127.0.0.1:' + port))
console.log(process.env)



/*************** Middleware *****************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*************** static init *****************/
app.use('/',express.static( path.join(__dirname, 'public') ))



/*************** router init *****************/
// const Router = require('./routes/')

// app.use('/', Router)


/*************** error init *****************/




