import User from '../models/user.model';
import {validate} from '../libs/Validation/validation';
import JWT from '../libs/JWT/jwtToken';

export async function createUser(options) {
  try {
    return await User.create(options);
  } catch (err) {
    console.log('error create user : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function editUser(options) {
  try {
    let user = await User.findById(options.id);
    user.userName = options.userName || user.userName;
    user.email = options.email || user.email;
    user.phoneNumber = options.phoneNumber || user.phoneNumber;
    user.address = options.address || user.address;
    await user.save();
    return user;
  } catch (err) {
    console.log('error editUser : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function getUser(options) {
  try {
    let data = await User.findById(options.id).lean();
    delete data.password;
    return data;
  } catch (err) {
    console.log('error getUser : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function getAllUser() {
  try {
    let data = await User.find().lean();
    delete data.password;
    return data;
  } catch (err) {
    console.log('error getUser : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function deleteUser(options) {
  try {
    await User.updateOne({
      _id: options.id
    }, {
      $set: {
        status: 'deleted'
      }
    });
    return true;
  } catch (err) {
    console.log('error deleteUser : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function login(options) {
  try {
    let user = await User.findOne({userName: options.userName}).lean();
    if(!user){
      return Promise.reject({status: 400, success: false, error: 'User not found.'})
    }
    if(validate(user.password, options.password)){
      return {
        success: true,
        _id : user._id,
        userName: user.userName,
        email : user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        isAdmin : user.isAdmin,
        status : user.status,
        token: JWT.issue({_id: user._id}),
        expired: 1800000
      }
    } else {
      return Promise.reject({success: false, status: 400, error:'Invalid Password.'});
    }
  } catch (err) {
    console.log('error login : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
