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
  }
};

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/api/users/login`,
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${BASE_URL}/api/users/logout`, null, {
    withCredentials: true,
  });
  return response.data;
};

export const getToken = () => {
  return axios.post(`${BASE_URL}/api/users/get-token`, null, {
    withCredentials: true,
  });
};

export const getUser = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/users/get-user`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const registerUser = async (firstname, lastname, email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/register`,
      JSON.stringify({ firstname, lastname, email, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    alert(err?.response?.data?.err || 'An error occurred');
    console.error('Error registering user:', err);
    throw err;
  }
};

export const forgotPasswordUser = (data) => {
  return axios.put(`${BASE_URL}/api/users/forgot-password`, data, {
    withCredentials: true,
  });
}

export const resetPasswordUser = (data, token) => {
  return axios.put(`${BASE_URL}/api/users/reset-password`, data, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}

export const deleteCart = async () => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'DELETE',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to delete cart');
  }

  return result;
};

export const saveCart = async (items) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to save cart');
  return data;
};