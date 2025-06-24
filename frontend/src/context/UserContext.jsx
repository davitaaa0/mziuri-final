import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'https://davitaspronia.onrender.com'; 

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
    const res = await fetch(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    const backendItems = await res.json();

    const localItems = JSON.parse(localStorage.getItem('cart')) || [];

    const merged = mergeCarts(localItems, backendItems);

    setCartItems(merged);
    localStorage.setItem('cart', JSON.stringify(merged));

    await fetch(`${BASE_URL}/api/cart`, {
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

