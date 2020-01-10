import {getByType} from "../ManageSocket/handle.pool";
import {sendData} from "../ManageSocket/send.message";
export async function sendSocketToAdmin(data) {
  try {
    let listAdmin = getByType(1);
    sendData(listAdmin,'NEW_ORDER', data)
  } catch (err) {
    throw err;
  }
}
