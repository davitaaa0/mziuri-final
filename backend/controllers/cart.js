import Cart from '../models/cart.js'

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId');
    return res.json(cart?.items || []);
  } catch (err) {
    console.error('Error in getCart:', err);
    return res.status(500).json({ error: 'Failed to get cart' });
  }
};

export const saveCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ user: userId, items });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

