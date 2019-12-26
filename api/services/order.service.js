import Order from '../models/order.model';
import {validate} from '../libs/Validation/validation';
import {sendSocketToAdmin} from "../../socket/handle/user.socket";
import JWT from '../libs/JWT/jwtToken';

export async function createOrder(options) {
  try {
    options.time
    let data = await Order.create(options);
    await sendSocketToAdmin(data);
    return data;
  } catch (err) {
    console.log('error create order : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function editOrder(options) {
  try {
    let order = await Order.findById(options.id);
    order.phoneNumber = options.phoneNumber || order.phoneNumber;
    order.address = options.address || order.address;
    order.timeOrder = options.timeOrder || order.timeOrder;
    await order.save();
    return order;
  } catch (err) {
    console.log('error editOrder : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function getOrder(options) {
  try {
    let data = await Order.findById(options.id).lean();
    return data;
  } catch (err) {
    console.log('error getOrder : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function getAllOrder() {
    try {
      let data = await Order.find().sort({_id : -1}).lean();
      return data;
    } catch (err) {
      console.log('error getAllOrder : ', err);
      return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
    }
  }

  export async function getByUser(options) {
    try {
      let data = await Order.find({userId : options.id}).sort({_id : -1}).lean();
      return data;
    } catch (err) {
      console.log('error getAllOrder : ', err);
      return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
    }
  }
  getByUser
export async function deleteOrder(options) {
  try {
    await Order.updateOne({
      _id: options.id
    }, {
      $set: {
        status: 'reject'
      }
    });
    return true;
  } catch (err) {
    console.log('error deleteOrder : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function changeStatusOrder(options) {
    try {
      await Order.updateOne({
        _id: options.id,
      }, {
        $set: {
          status: options.status
        }
      });
      return true;
    } catch (err) {
      console.log('error changeStatusOrder : ', err);
      return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
    }
  }
