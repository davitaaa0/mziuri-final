import axios from 'axios';

const BASE_URL = 'https://davitaspronia.onrender.com'; 

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    alert(err?.response?.data?.err || 'Login failed');
    console.error('Error logging in:', err);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error logging out:', err);
    throw err;
  }
};

export const getToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/users/get-token`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Error getting token:', err);
    throw err;
  }
};

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/get-user`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  }
};

export const registerUser = async (firstname, lastname, email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/register`,
      { firstname, lastname, email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    const message = err?.response?.data?.err || 'Registration failed';
    alert(message);
    console.error('Error registering user:', err);
    throw err;
  }
};


export const forgotPasswordUser = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/users/forgot-password`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error in forgot password:', err);
    throw err;
  }
};

export const resetPasswordUser = async (data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/users/reset-password`, data, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error resetting password:', err);
    throw err;
  }
};

export const fetchCart = async (token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get(`${BASE_URL}/api/cart`, {
      headers,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw error;
  }
};

export const saveCart = async (items, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.post(
      `${BASE_URL}/api/cart`,
      { items },
      {
        headers,
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error('Error saving cart:', error.response?.data || error.message);
    throw error;
  }
};

