import * as Drink_Service from '../services/drink.service';
import {isObjectId} from '../libs/StringHelper';
export async function createDrink(req, res) {
    try {
      let options = req.body;
      if(!options.name 
        || !options.price) {
        throw {
          status: 400,
          success: false,
          error: 'Invalid Params'
        }
      }
      let data = await Drink_Service.createDrink(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getDrink(req, res) {
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
      let data = await Drink_Service.getDrink(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getProductByStatus(req, res) {
    try {
      let status = req.params.status;
      let options = {
        status
      };
      let data = await Drink_Service.getProductByStatus(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getProductByType(req, res) {
    try {
      let type = req.params.type;
      let options = {
        type
      };
      let data = await Drink_Service.getProductByType(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function getAllDrink(req, res) {
    try {
      let data = await Drink_Service.getAllDrink();
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  export async function deleteDrink(req, res) {
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
      let data = await Drink_Service.deleteDrink(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  
export async function editDrink(req, res) {
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
      let data = await Drink_Service.editDrink(options);
      return res.json(data)
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
  