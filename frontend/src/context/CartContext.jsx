import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { userData } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const syncCartAfterLogin = async () => {
      if (!userData?.token) return;

      try {
        const res = await axios.get('http://localhost:3003/api/cart', {
          headers: { Authorization: `Bearer ${userData.token}` },
          withCredentials: true,
        });

        const data = res.data;
        const backendItems = Array.isArray(data) ? data : data.items || [];

        const localItems = JSON.parse(localStorage.getItem('cart')) || [];
        const merged = mergeCarts(localItems, backendItems);

        setCartItems(merged);
        localStorage.setItem('cart', JSON.stringify(merged));
        
        await axios.post(
          'http://localhost:3003/api/cart',
          { items: merged },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`,
            },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error('Cart sync failed:', err);
      }
    };

    syncCartAfterLogin();
  }, [userData]);


  const mergeCarts = (local, backend) => {
    const map = new Map();
    [...local, ...backend].forEach((item) => {
      const id = item.productId?._id || item.productId || item._id;
      if (!map.has(id)) {
        map.set(id, { ...item, productId: id });
      } else {
        map.get(id).quantity += item.quantity;
      }
    });
    return Array.from(map.values());
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id || item.productId?._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          (item.productId === product._id || item.productId?._id === product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { productId: product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => {
        const id = item.productId?._id || item.productId;
        return id !== productId;
      })
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (!quantity || quantity < 1) quantity = 1;

    setCartItems((prev) =>
      prev.map((item) => {
        const id = item.productId?._id || item.productId;
        return id === productId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
