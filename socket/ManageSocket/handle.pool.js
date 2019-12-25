import Pool from '../pool';

const socketPool = new Pool();

export function addPool(socket) {
  socketPool.add2Pool(socket);
  console.log('List Socket: ', socketPool);
}

export function removePool(socket) {
  socketPool.removeInPool(socket);
  console.log('List Socket: ', socketPool);
}

export function getByTypeAndUserId(type, userId) {
  return socketPool.getByTypeAndUserId(type, userId);
}

export function getByType(type) {
  return socketPool.getByType(type);
}

export function countSocketInPool(type, userId){
  return socketPool.getByTypeAndUserId(type, userId).length;
}

