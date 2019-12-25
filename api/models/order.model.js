import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Order = new Schema({
  userId: {type: String, required: true, index: 1},
  phoneNumber: {type: String, default: ''},
  address: { type: String, default: '' },
  timeOrder: { type: Date, default: Date.now},
  timeService: { type: Date},
  listItem: { type: Array},
  status: {type: String, enum: ['Wait Confirm', 'Doing', 'Serviced', 'Reject'], default: 'Wait Confirm'},
});

export default mongoose.model('order', Order);
