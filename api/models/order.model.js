import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Order = new Schema({
  userId: {type: String, required: true, index: 1},
  address: { type: String },
  timeOrder: { type: Date, default: Date.now},
  timeService: { type: Date, },
  listItem: { type: Array},
  status: {type: String, enum: ['wait-confirm', 'doing', 'service', 'reject'], default: 'wait-confirm'},
});

export default mongoose.model('order', Order);
