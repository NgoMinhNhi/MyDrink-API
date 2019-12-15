import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  userName: {type: String, required:true, index: 1},
  password: {type: String, required: true, index: 1},
  phoneNumber: {type: String, required: true, index: 1},
  email: {type: String, index: 1},
  address: {type: String, index: 1},
  status: {type: String, enum: ['actived', 'deleted'], default: 'actived'},
  createdAt: { type: Date, default: Date.now},
  isAdmin: { type: Number , enum : [ 0, 1], default: 0} // 1 là admin, 0 k là admin
});

export default mongoose.model('user', User);
