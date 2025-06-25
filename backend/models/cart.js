import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

export default mongoose.model('Cart', cartSchema);
