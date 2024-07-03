import axios from "axios";

export const getCategories = async (offset, limit, sortOrder) => {
  const response = await axios.get(`https://localhost:7283/api/Categories/${offset}/${limit}?sortOrder=${sortOrder}`)
  return response.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`https://localhost:7283/api/Categories/${id}`);
};

export const insertCategory = async (name) => {
  const response = await axios.post(`https://localhost:7283/api/Categories`, { name });
  return response.data.id; 
};