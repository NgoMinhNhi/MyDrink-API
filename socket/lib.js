import statusConstant from "../common/constants/socketType";
import {verifyUser} from "../api/libs/JWT/verify.token";


export async function validateAndGetInfoFrom(value){
  try {
    let rs = await verifyUser(value);
    if(rs.success) {
      return rs.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error validateAndGetInfoFrom : ', error);
  }
}
