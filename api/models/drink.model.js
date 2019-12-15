import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Drink = new Schema({
  name : {type: String, required: true, index: 1},
  price: { type: Number, required: true},
  type: { type: String},
  size: { type: Array},
  imgSrc: { type: String},
  description : { type:  String},
  totalLikes : { type: Number, default: 0},
  status: {type: Number, enum: ['available', 'out-stock', 'deleted'], default: 'available'}, // 1: available, 0:unavailable
});

export default mongoose.model('drink', Drink);
