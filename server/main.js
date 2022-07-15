'use strict'
const app = require("./app");
const server = require('http').Server(app);
var io = require('socket.io').listen(server);
const config = require("./config");


global.io = io;




  server.listen(config.PORT, () => {
    console.log(`App en el puerto ${config.PORT}`);
  })






module.exports = {

}