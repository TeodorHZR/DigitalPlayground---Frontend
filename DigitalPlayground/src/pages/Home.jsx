import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
  const news = [
    { title: "Call of Duty Season 3 Reloaded este acum live pentru MW3 și Warzone.", text: "Call of Duty lanseaza Reload-ul sezonului trei al lui Modern Warfare 3 și al Warzone-ului, care aduce noi harti multiplayer, moduri si operatori." },
    { title: "Zvon: Personaj clasic Call of Duty ar putea sa fie bonus de precomanda pentru Call of Duty: Black Ops 6.", text: "Conform zvonurilor, un personaj clasic din seria Call of Duty ar putea sa apara din nou ca bonus de precomandă pentru Call of Duty: Black Ops 6." },
    { title: "Un fan Destiny 2 realizeaza o impresionanta desenare cu creion colorat a unui Warlock", text: "Un talentat artist realizeaza o impresionanta desenare a unui Warlock din Destiny 2, folosind creioane colorate pentru a crea opera de artă minunata." },
    { title: "The Crew 2 primeste recenzii negative in masa", text: "Numerosi jucatori nemultumiti se intorc impotriva The Crew 2 și bombardeaza jocul de curse online-only multiplayer al Ubisoft-ului cu recenzii negative." },
    { title: "Sonic the Hedgehog primeste 3 noi seturi LEGO in vara.", text: "Franciza Sonic the Hedgehog a SEGA si LEGO colaboreaza din nou pentru trei seturi noi care vor fi lansate mai tarziu in vara." },
    { title: "Jucator Stardew Valley gaseste o descoperire dupa 250 de ore.", text: "Un jucator Stardew Valley imparte o descoperire pe care a gasit-o doar dupa 250 de ore in joc, care ar putea fi utila pentru unii fani." },
    { title: "Abonatii GTA+ primesc L.A. Noire si 2 vehicule gratuite pentru Grand Theft Auto Online.", text: "L.A. Noire, clasicul de actiune-aventura cu detectivi din anii '40 de la Rockstar Games, va fi disponibil pe serviciul de abonament GTA+ fara costuri suplimentare." },
    { title: "Halo Infinite lanseaza un update mare cu noi functii.", text: "Halo Infinite a lansat una dintre cele mai importante actualizari de continut, plina cu schimbari de echilibru si de gameplay." },
    { title: "Amenda URIASA in gaming: dezvoltatorul Fortnite are de platit peste 500 de milioane de euro!", text: "Comisia Federala pentru Comert din SUA a concluzionat ca dezvoltatorii au incalcat confidentialitatea jucatorilor, ca i-au indus in eroare prin „interfete inselatoare”, prin intermediul carora au pacalit copiii sa faca achizitii in joc." },
  ];

  const videos = [
    { title: "Counter Strike 2", id: "RA8Lct7LET4" },
    { title: "Dead by daylight", id: "t0g4X4m3KOY" },
    { title: "League of legends", id: "x1SecGez6as" }, 
  ];
  
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((currentNews + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentNews]);

  const handleLogout = () => {
    localStorage.removeItem('money');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('expirationdate');
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    navigate('/');
  };

  return (
    <div>
      <style>
    {`
      body {
        background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4bdd888b-fe5c-4358-8c46-5362c7ce3154/dehn7hz-56d75669-c27f-4d2b-8e30-91dc2c542e4c.jpg/v1/fill/w_1280,h_720,q_75,strp/cool_gaming_background_4k_by_skullbreaker000_dehn7hz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNGJkZDg4OGItZmU1Yy00MzU4LThjNDYtNTM2MmM3Y2UzMTU0XC9kZWhuN2h6LTU2ZDc1NjY5LWMyN2YtNGQyYi04ZTMwLTkxZGMyYzU0MmU0Yy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.oV9fk5Nb0ps6-6_Omk6AfhkNvdqDyQRvV_hLyys1S6Q');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        color: white;
      }
    `}
    </style>
    <div style={{ maxWidth: "none", margin: 0, padding: 0, textAlign: "left" }}>
      <MDBContainer fluid>
        <MDBRow className="justify-content-between align-items-center">
          <MDBCol sm="auto">
            <Link to="/games" style={{ textDecoration:"none", color: "white" }}>
              <h1 className="fw-bold mb-0">
                <MDBIcon icon="bi bi-controller" className="me-3" style={{ fontSize: "3rem", color: "#709085" }} />
                Digital Playground
              </h1>
            </Link>
          </MDBCol>
          <MDBCol sm="auto">
            <button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "1px solid white", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
              Log out
            </button>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <br/>
            <br/>
            <h2><i className="bi bi-newspaper"></i> Stiri si actualizari</h2>
            <MDBRow>
              <MDBCol>
                <MDBCard style={{ maxWidth: "22rem", backgroundColor: "transparent", border: "1px solid white", height: "250px" }}>
                  <MDBCardBody style={{ height: "100%", overflowY: "auto" }}>
                    <MDBCardTitle style={{ color: "white" }}>{news[currentNews].title}</MDBCardTitle>
                    <MDBCardText style={{ color: "white" }}>{news[currentNews].text}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard style={{ maxWidth: "22rem", backgroundColor: "transparent", border: "1px solid white", height: "250px" }}>
                  <MDBCardBody style={{ height: "100%", overflowY: "auto" }}>
                    <MDBCardTitle style={{ color: "white" }}>{news[(currentNews + 1) % news.length].title}</MDBCardTitle>
                    <MDBCardText style={{ color: "white" }}>{news[(currentNews + 1) % news.length].text}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard style={{ maxWidth: "22rem", backgroundColor: "transparent", border: "1px solid white", height: "250px" }}>
                  <MDBCardBody style={{ height: "100%", overflowY: "auto" }}>
                    <MDBCardTitle style={{ color: "white" }}>{news[(currentNews + 2) % news.length].title}</MDBCardTitle>
                    <MDBCardText style={{ color: "white" }}>{news[(currentNews + 2) % news.length].text}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <br/>
            <br/>
            <h2><i className="bi bi-camera-video"></i> Multimedia</h2>
            <br/>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              {videos.map((video, index) => (
                <div key={index} style={{ marginRight: '20px' }}>
                  <h3>{video.title}</h3>
                  <iframe
                    width="450"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </MDBCol>
        </MDBRow>
        <Footer />
      </MDBContainer>
    </div>
    </div>
  );
};

export default HomePage;
