import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3003/api/products`, {
      withCredentials: true 
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err)
  }
};