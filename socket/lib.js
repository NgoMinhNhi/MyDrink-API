import statusConstant from "../common/constants/socketType";
import {verifyToken} from "../api/libs/JWT/verify.token";

/**
 * Validate and get information from jwt
 * if jwt doesn't exists, return null
 * else return object which contains userid and type of user
 * @param jwt
 */
export async function validateAndGetInfoFromJwt(jwt){
  try {
    let rs = await verifyToken(jwt);
    console.log(rs);
    if(rs.success) {
      return rs.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error validateAndGetInfoFromJwt : ', error);
  }
}
