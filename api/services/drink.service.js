import Drink from '../models/drink.model';
import {validate} from '../libs/Validation/validation';
import JWT from '../libs/JWT/jwtToken';

export async function createDrink(options) {
  try {
    return await Drink.create(options);
  } catch (err) {
    console.log('error create drink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function editDrink(options) {
  try {
    let drink = await Drink.findById(options.id);
    drink.name = options.name || drink.name;
    drink.price = options.price || drink.price;
    drink.size = options.size || drink.size;
    drink.imgSrc = options.imgSrc || drink.imgSrc;
    drink.description = options.description || drink.description;
    drink.totalLikes = options.totalLikes || drink.totalLikes;
    drink.status = options.status || drink.status;
    await drink.save();
    return drink;
  } catch (err) {
    console.log('error editDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}

export async function getDrink(options) {
  try {
    let data = await Drink.findById(options.id).lean();
    return data;
  } catch (err) {
    console.log('error getDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function getProductByStatus(options) {
  try {
    let data = await Drink.find({status : options.status}).sort({_id : -1}).limit(8).lean();
    return data;
  } catch (err) {
    console.log('error getDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function getProductByType(options) {
  try {
    let data = await Drink.find({type : options.type}).sort({_id : -1}).limit(8).lean();
    return data;
  } catch (err) {
    console.log('error getDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function getAllDrink() {
    try {
      let data = await Drink.find().sort({_id : -1}).lean();
      return data;
    } catch (err) {
      console.log('error getDrink : ', err);
      return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
    }
  }
export async function deleteDrink(options) {
  try {
    await Drink.updateOne({
      _id: options.id
    }, {
      $set: {
        status: 'deleted'
      }
    });
    return true;
  } catch (err) {
    console.log('error deleteDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
export async function changeStatusDrink(options) {
  try {
    await Drink.updateOne({
      _id: options.id
    }, {
      $set: {
        status: options.status
      }
    });
    return true;
  } catch (err) {
    console.log('error changeStatusDrink : ', err);
    return Promise.reject({status: 500, success: true, error: 'Internal Server Error.'})
  }
}
