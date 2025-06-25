import express from "express";
import { getCart, saveCart, deleteCart } from "../controllers/cart.js";
import { auth } from "../middlewares/auth.js";

const CartRouter = express.Router();

CartRouter.get('/', auth, getCart);
CartRouter.post('/', auth, saveCart);
CartRouter.delete('/', auth, deleteCart);

export default CartRouter;