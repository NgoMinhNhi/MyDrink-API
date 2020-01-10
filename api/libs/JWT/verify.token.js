import jwt from './jwtToken';
import User from '../../models/user.model';
import {validate} from "../Validation/validation";

export async function verifyUser(options) {
  try{
    let user = await User.findOne({_id: options, isAdmin: 1}).lean();
    if(user){
        return {
          success: true,
          data: user
        }
    }
  }catch (err) {
    console.log('err  : ',err);
    return {
      success:false,
      error:'Internal Server Error'
    };
  }
}
