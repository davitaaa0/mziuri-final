import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const syncCartAfterLogin = async (token, setCartItems) => {
  try {
    const res = await fetch('http://localhost:3003/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Fetched cart data:', data);
    const backendItems = Array.isArray(data) ? data : data.items || [];

    if (!Array.isArray(backendItems)) {
      console.error('Backend cart is not an array:', backendItems);
      return;
    }

    const localItems = JSON.parse(localStorage.getItem('cart')) || [];

    const merged = mergeCarts(localItems, backendItems);

    setCartItems(merged);
    localStorage.setItem('cart', JSON.stringify(merged));

    await fetch('http://localhost:3003/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ items: merged }),
    });

  } catch (err) {
    console.error('Cart sync error:', err);
  }
};

const mergeCarts = (local, backend) => {
  const map = new Map();
  [...local, ...backend].forEach((item) => {
    const id = item.productId?._id || item.productId || item._id;
    if (!map.has(id)) {
      map.set(id, { ...item });
    } else {
      map.get(id).quantity += item.quantity;
    }
  });
  return Array.from(map.values());
};

export { UserContext, UserProvider, syncCartAfterLogin, mergeCarts };
