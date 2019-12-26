import jwt from './jwtToken';
import User from '../../models/user.model';
import {validate} from "../Validation/validation";

export async function verifyToken(options) {
  try{
    console.log(options);
    let user = await User.findOne({_id: options.phoneNumber}).lean();
    if(user){
      // if(validate(user.password, options.password)) {
        /**
         * Check Token Here
         * */
        return {
          success: true,
          data: user
        }
      // }
    }
  }catch (err) {
    console.log('err verifyToken : ',err);
    return {
      success:false,
      error:'Internal Server Error'
    };
  }
}
