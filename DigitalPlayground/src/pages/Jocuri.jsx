import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from 'emailjs-com'; 
import { getCategories } from "../services/categoryService";
import { getGamesByCategoryId, createGameTransaction, createOrUpdateReview, getReviewMessagesByGame } from "../services/gameService";
import { updateMoney } from "../services/userService";
import { MDBIcon, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import StarRating from '../components/StarRating'; 
import styled from 'styled-components';
import ReviewCarousel from "../components/ReviewCarousel";


const Jocuri = () => {
  const [money, setMoney] = useState(parseFloat(localStorage.getItem('money')) || 0);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [review, setReview] = useState({ message: "", rating: 0 });
  const [reviewsInput, setReviewsInput] = useState("");
  const [reviewMessages, setReviewMessages] = useState([]);
  const [email, setEmail] = useState(""); 

  const handleReviewClick = (game) => {
    setCurrentGame(game);
    setShowModal(true);
  };

  const StyledButton = styled(MDBBtn)`
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 5px;
    width: 120px;
    height: 40px;
    margin-right: 10px;
    box-shadow: 0 5px #999;
    transition: transform 0.3s ease-out;

    &:active {
      transform: translateY(4px);
      box-shadow: 0 1px #666;
    }
  `;

  const ReviewsInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 10px;

    span {
      font-size: 18px;
      margin-right: 10px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
      width: 250px;
      font-size: 16px;
    }

    button {
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 5px #999;
      transition: transform 0.3s ease-out;

      &:hover {
        background-color: #45a049;
      }

      &:active {
        transform: translateY(4px);
        box-shadow: 0 1px #666;
      }
    }
  `;

  const handleSendReview = async () => {
    const userId = localStorage.getItem('userId');
    await createOrUpdateReview(userId, currentGame.id, review.message, review.rating);
    setShowModal(false);
  };

  const handleSearchClick = async () => {
    const messages = await getReviewMessagesByGame(reviewsInput);
    setReviewMessages(messages);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const categoryName = event.target.value.toLowerCase();
      const category = categories.find(cat => cat.name.toLowerCase() === categoryName);

      if (category) {
        setSelectedCategoryId(category.id);
        event.target.value = '';
        setReviewsInput("");
      } else {
        console.error("Categoria nu a fost gasita");
      }
    }
  };

  const toggleOpen = () => setShowModal(!showModal);

  const handleBuyClick = async (game) => {
    if (money >= game.price) {
      try {
        const updatedMoney = money - game.price;
        localStorage.setItem('money', updatedMoney);
        setMoney(updatedMoney);

        const userId = localStorage.getItem('userId');
        await createGameTransaction(userId, game.price, game.id);
        await updateMoney(userId, updatedMoney);

        alert("Jocul a fost cumparat cu succes!");

        const cdKey = Math.random().toString(36).substr(2, 10).toUpperCase();

        const userEmail = prompt("Introduceti adresa de email pentru a primi detalii despre achizitie:");

        if (userEmail) {
          setEmail(userEmail);

          emailjs.send(
            'service_8sshv75',
            'template_d8ljs4e',
            {
              to_name: userEmail,
              from_name: 'DigitalPlayground Team',
              cd_key: cdKey
            },
            'tlgwW17Y7Pb6tbnRt'
          ).then((result) => {
            console.log(result.text);
            alert("Email-ul a fost trimis cu succes!");
          }, (error) => {
            console.log(error.text);
            alert("Eroare la trimiterea email-ului.");
          });
        }
      } catch (error) {
        console.error("Eroare la cumpararea jocului:", error);
        alert("Eroare la cumpararea jocului.");
      }
    } else {
      alert("Nu ai suficienti bani pentru a cumpara acest joc!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories(0, 100, 'asc');
        setCategories(data);
      } catch (error) {
        console.error("Eroare la obtinerea categoriilor:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchGames = async () => {
        try {
          const gamesData = await getGamesByCategoryId(selectedCategoryId);
          setGames(gamesData);
        } catch (error) {
          console.error("Eroare la obtinerea jocurilor:", error);
        }
      };

      fetchGames();
    }
  }, [selectedCategoryId]);

  return (
    <div className="container">
      <style>
        {`
          body {
            background-image: url('https://wallpapercave.com/wp/wp2635955.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            color: white;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #333;
            color: #fff;
            margin-left: -10.8%;
            width: 112.4%;
          }
          .search-input {
            padding: 10px;
            border: none;
            border-radius: 10px;
            width: 250px;
          }
          .search-icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .container {
            max-width: 100%;
          }
        `}
      </style>
      <div className="header">
        <div>
          <span><MDBIcon icon="bi bi-controller" className="me-3" />DigitalPlayground</span>
        </div>
        <div style={{ position: 'relative' }}>
          <input type="search" className="search-input" placeholder="Introdu categoria dorita" onKeyPress={handleKeyPress} />
          <span className="search-icon">
            <i className="fas fa-search" />
          </span>
        </div>
        <div>
          <i className="fas fa-coins" /> {money}
        </div>
      </div>
      <div style={{ marginLeft: 100 }}>
        <h2>Jocuri</h2>
        {games.length > 0 && (
          <>
            <div className="d-flex flex-wrap">
              {games.map(game => (
                <MDBCard style={{ width: '22rem', margin: '1rem', backgroundColor: 'rgba(128, 128, 128, 0.7)', animation: 'fadeIn 2s' }} key={game.id}>
                  <MDBCardBody>
                    <div className="d-flex justify-content-center mb-4">
                      <MDBBtn color="primary" size="sm" className="float-right buy-button" style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 10, padding: 5, width: '120px', height: '45px' }} onClick={() => handleBuyClick(game)}>
                        Cumpara acum
                      </MDBBtn>
                      <MDBBtn color="primary" size="sm" className="float-right review-button" style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 10, padding: 5, width: '120px', height: '45px' }} onClick={() => handleReviewClick(game)}>
                        Lasa un review
                      </MDBBtn>
                    </div>
                    <MDBCardTitle className="game-title">{game.name}</MDBCardTitle>
                    <MDBCardText className="game-description">
                      <strong>Descriere:</strong> {game.description}
                      <br />
                      <strong>Pret:</strong> {game.price}$
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </div>
            <ReviewsInputContainer>
              <span>Reviews:</span>
              <input
                type="text"
                value={reviewsInput}
                onChange={(e) => setReviewsInput(e.target.value)}
                placeholder="Introdu jocul dorit"
              />
              <button onClick={handleSearchClick}>Afiseaza reviews!</button>
            </ReviewsInputContainer>
            {reviewMessages.length > 0 && (
              <ReviewCarousel reviews={reviewMessages} />
            )}
          </>
        )}
      </div>
      <MDBModal open={showModal} onClose={() => setShowModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ color: "black" }}>Review pentru {currentGame?.name}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput style={{ color: "black" }} id='formControlLg' type='text' placeholder="Mesaj" required onChange={(e) => setReview({ ...review, message: e.target.value })} />
              <StarRating
                maxRating={5}
                color="gold"
                size={24}
                defaultRating={review.rating}
                onSetRating={(rating) => setReview({ ...review, rating })}
                className="star-rating"
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn style={{ width: '200px', height: '50px' }} onClick={handleSendReview}>Trimite review</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <style jsx>{`
        @keyframes fadeIn {
          0% {opacity: 0;}
          100% {opacity: 1;}
        }
        .game-title:hover + .game-description {
          display: block;
        }
        .game-description {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Jocuri;
