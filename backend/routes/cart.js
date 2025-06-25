import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getCart, saveCart, clearCart } from '../controllers/cart.js';

const CartRouter = express.Router();

CartRouter.get('/', auth, getCart);
CartRouter.post('/', auth, saveCart);
CartRouter.delete('/', auth, clearCart);

export default CartRouter;