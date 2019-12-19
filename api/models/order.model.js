import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Order = new Schema({
  userId: {type: String, required: true, index: 1},
  phoneNumber: {type: String},
  address: { type: String },
  timeOrder: { type: Date, default: Date.now},
  timeService: { type: Date, },
  listItem: { type: Array},
  status: {type: String, enum: ['new', 'seen', 'confirm', 'doing', 'service', 'reject'], default: 'new'},
});

export default mongoose.model('order', Order);
