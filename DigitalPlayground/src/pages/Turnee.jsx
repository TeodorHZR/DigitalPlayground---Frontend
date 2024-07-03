import React, { useEffect, useState } from "react";
import { getAllTournaments, getAllTeams, checkTeamMemberExists, insertTeamMember, joinTournament, getUpcomingTournament } from "../services/teamService"; 
import { useSpring, animated } from 'react-spring';
import './Turnee.css'; 

const Turnee = () => {
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [upcomingTournament, setUpcomingTournament] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchTournaments();
    fetchTeams();
    fetchUpcomingTournament();
  }, []);

  useEffect(() => {
    if (upcomingTournament) {
      const interval = setInterval(() => {
        const timeRemaining = new Date(upcomingTournament.startingTime) - new Date();
        if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown("Started");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [upcomingTournament]);

  const fetchTournaments = async () => {
    try {
      const data = await getAllTournaments();
      setTournaments(data);
    } catch (error) {
      setError('A aparut o eroare la obtinerea turneelor.');
    }
  };

  const fetchTeams = async () => {
    try {
      const data = await getAllTeams(); 
      setTeams(data);
    } catch (error) {
      setError('A aparut o eroare la obtinerea echipelor.');
    }
  };

  const fetchUpcomingTournament = async () => {
    try {
      const data = await getUpcomingTournament();
      setUpcomingTournament(data);
    } catch (error) {
      setError('A aparut o eroare la obtinerea turneului următor.');
    }
  };

 const handleJoinTeam = async (teamId) => {
    try {
      const isMember = await checkTeamMemberExists(teamId, userId);
      if (isMember) {
        alert('Deja faci parte din aceasta echipa.');
      } else {
        await insertTeamMember(teamId, userId);
        alert('Afiliere realizata cu succes!');
      }
    } catch (error) {
      setError('A aparut o eroare la verificarea afilierii.');
    }
  };

  const handleRegisterTournament = async (tournamentId) => {
    try {
      const joinTournamentModel = {
        Id: 0, 
        TournamentId: tournamentId,
        UserId: userId
      };
      const response = await joinTournament(joinTournamentModel.Id, joinTournamentModel.TournamentId, joinTournamentModel.UserId);
      alert('Inscriere cu succes!');
    } catch (error) {
      setError('A aparut o eroare la inscrierea in turneu.');
    }
  };

  const animatedTextProps = useSpring({
    loop: true,
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 10000 },
  });


  const springProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  return (
    <div>
      <style>
        {`
          body {
            background-image: url('https://png.pngtree.com/thumb_back/fh260/back_our/20190628/ourmid/pngtree-the-two-army-confrontation-tournament-game-board-background-image_276418.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            color: white;
          }
        `}
      </style>
      <animated.div style={animatedTextProps} className="animated-text">
        Urmatorul turneu incepe in: {countdown}
      </animated.div>

      <animated.div style={springProps}>
        <h1>Turnee Disponibile</h1>
        <div className="tournaments-container">
          {tournaments.map(tournament => (
            <div key={tournament.id} className="tournament-card">
              <h2>{tournament.name}</h2>
              <p>Premiul: {tournament.prize}$</p>
              <p>Data: {new Date(tournament.startingTime).toLocaleString()}</p>
              <div className="button-container">
              <button onClick={() => handleRegisterTournament(tournament.id)}>Inscriere</button>
              </div>
            </div>
          ))}
        </div>
      </animated.div>
      
      <animated.div style={springProps}>
        <h1>Echipe Disponibile</h1>
        <div className="teams-container">
          {teams.map(team => (
            <div key={team.id} className="team-card">
              <h2>{team.name}</h2>
              <p>{team.description}</p>
              <button onClick={() => handleJoinTeam(team.id)}>Alătură-te</button>
            </div>
          ))}
        </div>
      </animated.div>
      
      {error && <div>{error}</div>}
    </div>
  );
};

export default Turnee;
