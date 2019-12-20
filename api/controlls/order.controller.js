import * as Order_Service from '../services/order.service';
import {isObjectId} from '../libs/StringHelper';
export async function createOrder(req, res) {
    try {
      let options = req.body;
      if(!options.userId 
        ) {
        throw {
          status: 400,
          success: false,
          error: 'Invalid Params'
        }
      }
      let data = await Order_Service.createOrder(options);
      return res.json({
        success: true,
        data
      })
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getOrder(req, res) {
    try {
      let id = req.params.id;
      if(!isObjectId(id)){
        throw {
          status: 400,
          success: false,
          error: 'Invalid Params'
        }
      }
      let options = {
        id
      };
      let data = await Order_Service.getOrder(options);
      return res.json({
        success: true,
        data
      })
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getAllOrder(req, res) {
    try {
      let id = req.params.id;
      let options = {
        id
      };
      let data = await Order_Service.getAllOrder(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getByUser(req, res) {
    try {
      let id = req.params.id;
      let options = {
        id
      };
      let data = await Order_Service.getByUser(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  getByUser
  export async function deleteOrder(req, res) {
    try {
      let id = req.params.id;
      if(!isObjectId(id)){
        throw {
          status: 400,
          success: false,
          error: 'Invalid Params'
        }
      }
      let options = {
        id
      };
      let data = await Order_Service.deleteOrder(options);
      return res.json({
        success: data
      })
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  
export async function editOrder(req, res) {
    try {
      let options = req.body;
      options.id = req.params.id;
      if(!isObjectId(options.id)){
        throw {
          status: 400,
          success: false,
          error: 'Invalid Params'
        }
      }
      let data = await Order_Service.editOrder(options);
      return res.json({
        success: true,
        data
      })
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  