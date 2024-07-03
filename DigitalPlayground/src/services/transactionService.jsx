import axios from "axios";



export const fetchGameSalesStatistics = async () => {
    try {
        const response = await axios.get('https://localhost:7283/api/GameTransaction/sales-statistics');
        return response.data;
    } catch (error) {
        console.error("Error retrieving sales statistics:", error);
        throw error;
    }
};


export const fetchAllTransactions = async () => {
    try {
        const response = await axios.get(`https://localhost:7283/api/GameTransaction/all-transactions`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all transactions:", error);
        throw error;
    }
};

export const createSkinTransaction = async (skinTransaction) => {
    try {
        const response = await axios.post('https://localhost:7283/api/SkinTransaction/create', skinTransaction);
        return response.data;
    } catch (error) {
        console.error("Error creating skin transaction:", error);
        throw error;
    }
};
export const fetchSkinTransactions = async () => {
    try {
        const response = await axios.get('https://localhost:7283/api/SkinTransaction/getall');
        return response.data;
    } catch (error) {
        console.error("Error fetching skin transactions:", error);
        throw error;
    }
};