import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3003/api/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

export const loginUser = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3003/api/users/login',
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post('http://localhost:3003/api/users/logout', null, {
    withCredentials: true,
  });
  return response.data;
};

export const getToken = () => {
  return axios.post(`http://localhost:3003/api/users/get-token`, null, {
    withCredentials: true,
  });
};

export const getUser = async (token) => {
  const response = await axios.get(`http://localhost:3003/api/users/get-user`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const registerUser = async (firstname, lastname, email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/users/register',
      JSON.stringify({ firstname, lastname, email, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.err);
    console.error('Error registering user:', err);
    throw err;
  }
};

export const forgotPasswordUser = (data) => {
  return axios.put(`http://localhost:3003/api/users/forgot-password`, data, {
    withCredentials: true,
  });
}

export const resetPasswordUser = (data, token) => {
  return axios.put(`http://localhost:3003/api/users/reset-password`, data, {
    headers: { Authorization: token },
    withCredentials: true,
  });
}
