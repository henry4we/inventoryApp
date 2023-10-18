// Importing axios library for HTTP requests

// Retrieving the backend URL from environment variables

// Constructing the full API endpoint URL for products
/**
 * Creates a new product by sending a POST request with form data.
 * @param {Object} formData - The form data containing product details.
 * @returns {Object} - The response data from the server.
 */
// Making a POST request with the product data to the backend
// Returning the response data

import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products`;




const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};


const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
