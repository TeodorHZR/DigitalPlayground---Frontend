import React, { useEffect, useState } from 'react';
import { getAllTeams, getPlayersByTeam, getTournamentsForUser, createTeam } from '../services/teamService';
import ModalTournaments from '../components/ModalTournaments'; 
import styles from './style.module.css';

const Tournaments = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTournaments, setUserTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');

  const fetchTeamsAndPlayers = async () => {
    try {
      const teamData = await getAllTeams();
      setTeams(teamData);

      const playerDataPromises = teamData.map(async (team) => {
        const playerData = await getPlayersByTeam(team.id);
        return { teamId: team.id, players: playerData };
      });

      const playerDataArray = await Promise.all(playerDataPromises);

      const playersMap = playerDataArray.reduce((acc, { teamId, players }) => {
        acc[teamId] = players;
        return acc;
      }, {});

      setPlayers(playersMap);
      console.log(playersMap); 
    } catch (error) {
      console.error('Error fetching teams and players:', error);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const tournaments = await getTournamentsForUser(userId);
      setUserTournaments(tournaments);
      setSelectedUser(userId);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching tournaments for user:', error);
    }
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    const newTeam = { name: newTeamName, description: newTeamDescription };

    try {
      await createTeam(newTeam);
      setNewTeamName('');
      setNewTeamDescription('');
      fetchTeamsAndPlayers(); 
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  useEffect(() => {
    fetchTeamsAndPlayers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Gestionare Echipe & Turnee</h1>
      {teams.map((team) => (
        <div key={team.id} className={styles.team}>
          <h2>{team.name}</h2>
          <ul>
            {players[team.id] && players[team.id].length > 0 ? (
              players[team.id].map((player) => (
                <li key={player.id} onClick={() => handleUserClick(player.id)} style={{ cursor: 'pointer' }}>
                  {player.username}
                </li>
              ))
            ) : (
              <li>No players found</li>
            )}
          </ul>
        </div>
      ))}

      <div className={styles.addTeamForm}>
        <h2>Adauga o noua echipa</h2>
        <form onSubmit={handleCreateTeam}>
          <label htmlFor="teamName">Nume echipa:</label>
          <input
            type="text"
            id="teamName"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            required
          />
          <label htmlFor="teamDescription">Descriere echipa:</label>
          <textarea
            id="teamDescription"
            value={newTeamDescription}
            onChange={(e) => setNewTeamDescription(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Adauga echipa</button>
        </form>
      </div>

      <ModalTournaments isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Turneele la care userul participa:</h2>
        <ul>
          {userTournaments.length > 0 ? (
            userTournaments.map((tournament) => (
              <li key={tournament.id}>
                <strong>{tournament.name}</strong> - {new Date(tournament.startingTime).toLocaleString()} - Prize: {tournament.prize}
              </li>
            ))
          ) : (
            <li>No tournaments found</li>
          )}
        </ul>
      </ModalTournaments>
    </div>
  );
};

export default Tournaments;
