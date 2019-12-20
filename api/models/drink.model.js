import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Drink = new Schema({
  name : {type: String, required: true, index: 1},
  price: { type: Number, required: true},
  type: { type: String},
  size: { type: String},
  imgSrc: { type: String},
  detail : { type:  String},
  totalLikes : { type: Number, default: 0},
  status: {type: String, enum: ['Available', 'New', 'Hot', 'Percent Off', 'Out Stock', 'Deleted'], default: 'Available'}, // 1: available, 0:unavailable
});

export default mongoose.model('drink', Drink);
