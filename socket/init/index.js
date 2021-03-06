import configs from "../../api/config";
import utils from '../../utils/utils';
const http = require('http');
import statusConstant from '../../common/constants/socketType';
import {validateAndGetInfoFrom} from "../lib";
import * as Hand_Pool from '../ManageSocket/handle.pool';

const portSocket = configs.socket.port;

const Socket = function(server){
  // this.serverSocket = http.createServer(app);
  this.io = require('socket.io')(server, {'pingTimeout': 30000, 'pingInterval': 3000});
  this.socketAuth = require('socketio-auth');
};

Socket.prototype.init = function(){
  // this.serverSocket.listen(portSocket, function () {
  //   console.log('Start server socket in port ' + portSocket + '...');
  // });
  this.authenticate();
  this.startSocket();
};


Socket.prototype.authenticate = function(){
  this.socketAuth(this.io, {
    authenticate: function (socket, value, callback) {
      if (socket.myself) {
        return callback(null, true);
      }
      if (!value) { 
        return callback(null, false);
      }
      const jwt = value.jwt;
 
      validateAndGetInfoFrom(
        value
      ).then(userInfo => {
        if(!userInfo){
          return callback(null, false); 
        }
        socket.myself = {
          uid: utils.generateCode(),
          ...userInfo
        };
        Hand_Pool.addPool(socket);
        socket.emit(statusConstant.SocketMessage.Authenticated, {result: true});
        callback(null, true);
      })
    },
    timeout: 5000 // must emit 'authentication' with data {username:'abc'} in 5s, if not socket will be disconnected
  });
};

Socket.prototype.startSocket = function(){
  this.io.on('connection', function (socket) {
    console.log('User Connect : ', socket.id);

    socket.on('disconnect', function () {
      console.log('User disconnected : ', socket.id);
      Hand_Pool.removePool(socket); // remove socket in pool
      // if(socket.myself){
      //   const userId = socket.myself.userId;
      //   const type = socket.myself.type;
      //   if(Hand_Pool.countSocketInPool(type, userId) === 0){
      //
      //   }
      // }
    });
    socket.on('PING', () => {
      if(socket.myself) {
        socket.emit('PONG', {})
      }
    });

    socket.on('error', (error) => {
      socket.disconnect();
    });
  });
};


module.exports = Socket;
