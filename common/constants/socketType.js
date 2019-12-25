'use strict';
export default {
  SocketType: {
    CUSTOMER: 0,
    ADMIN: 1,
  },
  OrderStatus: {
    new: 'new',
    seen: 'seen',
    confirm: 'confirm',
    doing: 'doing',
    service: 'service',
    reject :'reject'
  },
  SocketMessage: {
    Authenticated: 'authenticated',
    NewOrder: 'new_order',
    AcceptOrder: 'accept_order',
    AcceptSuccess: 'accept_success',
  },
  SocketCode: {
    Missing_Information: 3001,
    Accept_Fail: 3002,
    Destroy_Fail: 3003
  }
};
