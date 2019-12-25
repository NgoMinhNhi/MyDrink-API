'use strict';
import statusConstant from '../../common/constants/socketType';

const SocketPool = function () {
  this.customerPools = {};
  this.adminPools = {};
};

/**
 * Add socket to pool
 * @param socket
 */
SocketPool.prototype.add2Pool = function (socket) {
  if (!socket.myself || !socket.myself._id) {
    throw new Error("missing data");
  }
  const type = socket.myself.isAdmin;
  const userId = socket.myself._id;
  if (statusConstant.SocketType.CUSTOMER === type) { // add to customer pool
    if (!this.customerPools[userId]) {
      this.customerPools[userId] = []
    }
    this.customerPools[userId].push(socket);
  }
  if (statusConstant.SocketType.ADMIN === type) { // add to customer pool
    if (!this.adminPools[userId]) {
      this.adminPools[userId] = []
    }
    this.adminPools[userId].push(socket);
  }
};

/**
 * Remove socket in pool
 * @param socket
 */
SocketPool.prototype.removeInPool = function (socket) {
  if (socket.myself) {
    const type = socket.myself.isAdmin;
    const userId = socket.myself._id;
    const uid = socket.myself.uid;

    if (statusConstant.SocketType.CUSTOMER === type) {
      if (this.customerPools[userId]) {
        this.customerPools[userId] = this.customerPools[userId].filter(s => {
          return s.myself.uid !== uid;
        });
        if(this.customerPools[userId].length === 0){
          delete this.customerPools[userId];
        }
      }
    }
    if (statusConstant.SocketType.ADMIN === type) {
      if (this.adminPools[userId]) {
        this.adminPools[userId] = this.adminPools[userId].filter(s => {
          return s.myself.uid !== uid;
        });
        if(this.adminPools[userId].length === 0){
          delete this.adminPools[userId];
        }
      }
    }
  }
};

/**
 * Get all sockets by type and userid
 * @param userId
 * @param type
 */
SocketPool.prototype.getByTypeAndUserId = function (type, userId) {
  let res = [];
  if (statusConstant.SocketType.CUSTOMER === type) {
    if (this.customerPools[userId]) {
      res = this.customerPools[userId];
    }
  }
  if (statusConstant.SocketType.ADMIN === type) {
    if (this.adminPools[userId]) {
      res = this.adminPools[userId];
    }
  }
  return res;
};

/**
 * Get all sockets by type
 * @param type
 */
SocketPool.prototype.getByType = function (type) {
  let res = [];
  if (statusConstant.SocketType.CUSTOMER === type) {
    Object.values(this.customerPools).map(sockets => {
      res = res.concat(sockets);
    });
  }
  if (statusConstant.SocketType.ADMIN === type) {
    Object.values(this.adminPools).map(sockets => {
      res = res.concat(sockets);
    });
  }
  return res;
};

module.exports = SocketPool;
