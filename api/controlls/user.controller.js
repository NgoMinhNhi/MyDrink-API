import * as User_Service from '../services/user.service';
import {hash} from '../libs/Validation/validation';
import {isObjectId} from '../libs/StringHelper';

export async function createUser(req, res) {
  try {
    let options = req.body;
    if(!options.password || !options.userName || !options.phoneNumber) {
      throw {
        status: 400,
        success: false,
        error: 'Invalid Params'
      }
    }
    options.password = hash(options.password);
    let data = await User_Service.createUser(options);
    return res.json({
      success: true,
      data,
      _id: data._id,
      isAdmin: data.isAdmin
    })
  } catch (err) {
    return res.status(err.status).json(err);
  }
}

export async function getUser(req, res) {
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
    let data = await User_Service.getUser(options);
    return res.json({
      success: true,
      data
    })
  } catch (err) {
    return res.status(err.status).json(err);
  }
}

export async function getUserByPhone(req, res) {
  try {
    let phone = req.params.phone;
    let options = {
      phone
    };
    let data = await User_Service.getUserByPhone(options);
    if (data.length == 1) {
      return res.json(data[0])
    } else return res.json(null)
  } catch (err) {
    return res.status(err.status).json(err);
  }
}
export async function getAllUser(req, res) {
  try {
    let data = await User_Service.getAllUser();
    return res.json({
      success: true,
      data
    })
  } catch (err) {
    return res.status(err.status).json(err);
  }
}
export async function deleteUser(req, res) {
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
    let data = await User_Service.deleteUser(options);
    return res.json({
      success: data
    })
  } catch (err) {
    return res.status(err.status).json(err);
  }
}

export async function editUser(req, res) {
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
    let data = await User_Service.editUser(options);
    return res.json({
      success: true,
      data
    })
  } catch (err) {
    return res.status(err.status).json(err);
  }
}

export async function login(req, res) {
  try {
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    if(!phoneNumber || !password) {
      throw {
        success: false,
        status: 400,
        error:'Invalid Params'
      }
    }
    let options ={
      phoneNumber,
      password
    };
    let data = await User_Service.login(options);
    return res.json(data)
  } catch (err) {
    return res.status(err.status).json(err);
  }
}
