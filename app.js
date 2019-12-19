/**
 * Creating Project REST API Project
 */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import configs from './api/config';
/**
 * Router variables
 */
import routers from './api/routers/index';
/**
 * Global variables
 */
const app = express();
const debug = require('debug')('workspace:server');
const http = require('http');
const socketio = require('socket.io');
const port = normalizePort(process.env.PORT || 8001);
const server = http.createServer(app);
var cors = require('cors')
const io = socketio.listen(server);
// import model sql
// require('./api/models')
mongoose.Promise = global.Promise;
mongoose.connect(configs.mongoURL,(err)=>{
	if(err)
		console.log(err);
	console.log('Da ket noi ket noi thanh cong!!!!');
})
/**
 * Use, Set
 */
app.use(cors())
app.use(morgan("dev"));
app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");
app.set('port',port);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API
 */
app.use('/api',routers);
/**
 * Socket IO
 */
/**
 * Socket IO
 */
/**
 * Setup Dev
 */
 server.listen(port,function(){
   console.log('Server dang hoat dong nhe!!!! port : '+port);
 });
 //server lang nghe

 server.on('error',onError);
 server.on('listening',onListening);

 // method
 function normalizePort(val) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
     // named pipe
     return val;
   }

   if (port >= 0) {
     // port number
     return port;
   }

   return false;
 }

 /**
  * Event listener for HTTP server "error" event.
  */

 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 /**
  * Event listener for HTTP server "listening" event.
  */

 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }
export default app;
