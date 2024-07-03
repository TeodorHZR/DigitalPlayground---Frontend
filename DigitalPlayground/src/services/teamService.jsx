import axios from 'axios';
export const getAllTournaments = async () => {
    try {
      const response = await axios.get('https://localhost:7283/api/tournament');
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('A aparut o eroare in timpul obtinerii turneelor.');
      }
    } catch (error) {
      console.error('Eroare la obținerea turneelor:', error);
      throw error;
    }
  };
  
  
  
  export const getAllTeams = async () => {
    try {
      const response = await axios.get('https://localhost:7283/api/team');
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('A aparut o eroare in timpul obtinerii echipelor.');
      }
    } catch (error) {
      console.error('Eroare la obținerea echipelor:', error);
      throw error;
    }
  };

export const checkTeamMemberExists = async (teamId, userId) => {
  try {
    console.log(userId);
    console.log(teamId);
    const response = await axios.get(`https://localhost:7283/api/TeamMember/${teamId}/member/${userId}/exists`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('A apărut o eroare în timpul verificării existenței membrului echipei.');
    }
  } catch (error) {
    console.error('Eroare la verificarea existenței membrului echipei:', error);
    throw error;
  }
};



export const insertTeamMember = async (teamId, userId) => {
  try {
    const response = await axios.post('https://localhost:7283/api/TeamMember', {
      TeamId: teamId,
      UserId: userId
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

export const joinTournament = async (id, tournamentId, userId) => {
  try {
    const response = await axios.post('https://localhost:7283/api/JoinTournament/join', {
      Id:id,
      TournamentId: tournamentId,
      UserId: userId
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('A aparut o eroare in timpul inscrierii la turneu.');
    }
  } catch (error) {
    console.error('Eroare la inscrierea la turneu:', error);
    throw error;
  }
};

export const getUpcomingTournament = async () => {
  try {
    const response = await axios.get('https://localhost:7283/api/tournament/upcoming');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('A apărut o eroare în timpul obținerii turneului următor.');
    }
  } catch (error) {
    console.error('Eroare la obținerea turneului următor:', error);
    throw error;
  }
};



export const getPlayersByTeam = async (teamId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/TeamMember/${teamId}/players`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('A apărut o eroare în timpul obținerii jucătorilor echipei.');
    }
  } catch (error) {
    console.error('Eroare la obținerea jucătorilor echipei:', error);
    throw error;
  }
};

export const getTournamentsForUser = async (userId) => {
  try {
    const response = await axios.get(`https://localhost:7283/api/jointournament/user/${userId}/tournaments`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching tournaments for user.');
    }
  } catch (error) {
    console.error('Error fetching tournaments for user:', error);
    throw error;
  }
};



export const createTeam = async (team) => {
  try {
    const response = await axios.post('https://localhost:7283/api/team/create', team);
    if (response.status === 201) { 
      return response.data;
    } else {
      throw new Error('A apărut o eroare în timpul creării echipei.');
    }
  } catch (error) {
    console.error('Eroare la crearea echipei:', error);
    throw error;
  }
};
