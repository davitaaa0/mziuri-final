import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { saveCart, deleteCart } from '../api/api';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { userData } = useContext(UserContext);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    if (userData?.token) {
      const items = cartItems.map(item => ({
        productId: item.productId?._id || item._id,
        quantity: item.quantity,
      }));

      console.log('Saving cart to backend:', items);
      saveCart(items, userData.token);
    }
  }, [cartItems, userData]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => (item.productId?._id || item._id) === product._id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          (item.productId?._id || item._id) === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { productId: product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const id = item.productId?._id || item._id;
        return id !== productId;
      })
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const id = item.productId?._id || item._id;
        if (id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem('cart');

    if (userData?.token) {
      try {
        console.log('Token used for deleteCart:', userData.token);
        await deleteCart(userData.token);
      } catch (error) {
        console.error('Failed to clear cart on backend:', error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
