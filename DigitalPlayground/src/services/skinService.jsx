import axios from 'axios';

export const getAvailableForGame = async (gameId, excludeUserId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/Skins/availableGame/${gameId}/${excludeUserId}`);
    return response.data;
  } catch (error) {
    console.error("Eroare la obtinerea skinurilor:", error);
  }
};

export const updateUserForSkin = async (skinId, userId) => {
  try {
    const response = await axios.put(`https://localhost:7283/api/Skins/${skinId}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Eroare la actualizarea UserId pentru skin:", error);
  }
};

export const getSkinsByMaxPrice = async (maxPrice, gameId, excludeUserId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/Skins/maxPrice/${maxPrice}/game/${gameId}/excludeUser/${excludeUserId}`);
    return response.data;
  } catch (error) {
    console.error("Eroare la obtinerea skinurilor:", error);
  }
};
export const getAllSkins = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/Skins?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving skins:", error);
    throw error;
  }
};

export const deleteSkin = async (skinId) => {
  try {
    const response = await axios.delete(`https://localhost:7283/api/Skins/${skinId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting skin:", error);
    throw error;
  }
};

export const createSkin = async (skin) => {
  try {
    const response = await axios.post('https://localhost:7283/api/Skins/create', skin);
    return response.data;
  } catch (error) {
    console.error("Error creating skin:", error);
    throw error;
  }
};



export const getSkinsOrderedByPrice = async (ascending, gameId, excludeUserId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/Skins/orderByPrice?ascending=${ascending}&gameId=${gameId}&excludeUserId=${excludeUserId}`);
    return response.data;
  } catch (error) {
    console.error("Eroare la obtinerea skinurilor ordonate dupa pret:", error);
  }
};

export const getAllByUserId = async (userId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/Skins/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Eroare la obtinerea skinurilor pentru utilizator:", error);
  }
};



export const updateIsForSale = async (skinId, isForSale) => {
  try {
    console.log(isForSale);
    console.log(skinId);
    const response = await axios.put(`https://localhost:7283/api/Skins/${skinId}/isForSale`, { IsForSale: isForSale });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Eroare la actualizarea IsForSale pentru skin:", error);
    throw error;
  }
};

export const updatePrice = async (skinId, price) => {
  try {
    console.log(price);
    console.log(skinId);
    const response = await axios.put(`https://localhost:7283/api/Skins/${skinId}/price`, { price });
    return response.data;
  } catch (error) {
    console.error("Eroare la actualizarea pretului pentru skin:", error);
  }
};