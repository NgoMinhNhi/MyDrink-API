import * as ethUtil from "ethereumjs-util";
import sigUtil from 'eth-sig-util';
const msg = "Avast! Take special care o'yer Skully rare collecti-bles. Sign belowt' authenticate yer transactions. Arrrgh!!";

export async function validation_Sign(address_eth, signature) {
 try{
   const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
   // console.log(signature);
   const address = sigUtil.recoverPersonalSignature({data: msgBufferHex, sig: signature});
   // console.log(address);
   return address.toLowerCase() === address_eth.toLowerCase();
 } catch (err) {
   console.log('error validation_Sign : ',err);
   return false;
 }
}
