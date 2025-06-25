import Cart from '../models/cart.js'

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart?.items || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

export const saveCart = async (req, res) => {
  const { items } = req.body;
  try {

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Cart saved', cart: updatedCart });
  } catch (err) {
    console.error('saveCart error:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
};


export const clearCart = async (req, res) => {
  try {
    console.log('Clearing cart for user:', req.user?.id);

    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
