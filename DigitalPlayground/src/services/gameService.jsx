import axios from "axios";

export const getGamesByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(`https://localhost:7283/api/Games/category/${categoryId}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Eroare la obtinerea jocurilor:", error);
      return [];
    }
  };
 
  export const createGameTransaction = async (userId, amount, gameId) => {
    try {
        console.log(userId);
        console.log(amount);
        console.log(gameId);
        const endpoint = "https://localhost:7283/api/GameTransaction/create";
        const response = await axios.post(endpoint, {
            userId: userId,
            amount: amount,
            gameId: gameId,
            date: new Date().toISOString() 
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Eroare la crearea tranzacției de joc");
        }
    } catch (error) {
        console.error("Eroare la crearea tranzacției de joc:", error);
        throw error;
    }
};
  export const createOrUpdateReview = async (userId, gameId, message, rating) => {
    try {
      const endpoint = "https://localhost:7283/api/Reviews/createOrUpdate";
      const response = await axios.post(endpoint, { userId, gameId, message, rating });
      
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Eroare la crearea sau actualizarea recenziei.");
      }
    } catch (error) {
      console.error("Eroare la crearea sau actualizarea recenziei:", error);
      throw error;
    }
  };

  export const getAllGames = async (offset, limit, sortOrder) => {
      const response = await axios.get(`https://localhost:7283/api/Games/${offset}/${limit}?sortOrder=${sortOrder}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Eroare la obținerea tuturor jocurilor.");
      }
  };

  export const deleteGame = async (id) => {
    const response = await axios.delete(`https://localhost:7283/api/Games/${id}`);
    if (response.status === 204) {
      return true;
    } else {
      throw new Error("Eroare la ștergerea jocului.");
    }
  };


  export const updateGame = async (id, game) => {
    const response = await axios.put(`https://localhost:7283/api/Games/${id}`, game);
    if (response.status === 204) {
      return true;
    } else {
      throw new Error("Eroare la actualizarea jocului.");
    }
  };

  export const getReviewMessagesByGame = async (gameName) => {
    try {
      const response = await axios.get(`https://localhost:7283/api/Reviews/reviews/${gameName}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("A apărut o eroare în timpul obținerii mesajelor de recenzie.");
      }
    } catch (error) {
      console.error("Eroare la obținerea mesajelor de recenzie:", error);
      throw error;
    }
  };
  
  export const fetchTransactions = async (userId, offset, limit) => {
    try {
      const response = await axios.get(`https://localhost:7283/api/GameTransaction/user/${userId}/purchasedGames?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Eroare la obtinerea tranzacțiilor:", error);
      throw error;
    }
  };


  export const insertGame = async (game) => {
    const response = await axios.post(`https://localhost:7283/api/Games`, game);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Eroare la adăugarea jocului.");
    }
  };