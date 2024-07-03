import axios from 'axios';

export const insertUser = async (username, password) => {
  const response = await axios.post(`https://localhost:7283/api/User/insert`, {
      Username: username,
      Password: password,
  });
  console.log(response);
};
export const updateMoney = async (userId, updatedMoney) => {
  try {
    const endpoint = `https://localhost:7283/api/User/${userId}/updateMoney`;
    console.log(updatedMoney);
    const response = await axios.put(endpoint, { UpdatedMoney: updatedMoney });
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Eroare la actualizarea banilor utilizatorului");
    }
  } catch (error) {
    console.error("Eroare la actualizarea banilor utilizatorului:", error);
    throw error; 
  }
};

export const updatePassword = async (userId, newPassword) => {
  try {
    const endpoint = `https://localhost:7283/api/User/${userId}/updatePassword`;
    const response = await axios.put(endpoint, { NewPassword: newPassword });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Eroare la actualizarea parolei utilizatorului");
    }
  } catch (error) {
    console.error("Eroare la actualizarea parolei utilizatorului:", error);
    throw error;
  }
};


export const getUserData = async (username) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/user/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`https://localhost:7283/api/user/getall`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`https://localhost:7283/api/User/${userId}`);
    console.log
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export const updateAdminStatus = async (userId, isAdmin) => {
  try {
    console.log(isAdmin); 
    const endpoint = `https://localhost:7283/api/User/${userId}/updateAdminStatus`;
    const response = await axios.put(endpoint, null, {
      params: { isAdmin: isAdmin }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Eroare la actualizarea statusului de administrator");
    }
  } catch (error) {
    console.error("Eroare la actualizarea statusului de administrator:", error);
    throw error;
  }
};
