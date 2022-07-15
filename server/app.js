'use strict'
const express = require('express')
//const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const rutas = require('./rutas/rutas_pwa')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('./scr/public'))
//app.use(fileUpload())

app.use(function (req, res, next) {
    
   
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use("/intelagro", rutas);

module.exports = app