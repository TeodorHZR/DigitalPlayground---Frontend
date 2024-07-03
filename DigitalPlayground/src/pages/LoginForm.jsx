import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
    Cookies.remove("isAdmin");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7283/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    
      if (!response.ok) {
        setError("Date de autentificare invalide");
        return;
      }
    
      const data = await response.json();
      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("expirationDate", data.expirationDate); 
      await getUserIdAndMoney(username);
      await getUserData(username);
      window.location.href = "/home";
    } catch (error) {
      setError("A aparut o eroare la autentificare. Va rugam sa incercati din nou.");
    }
  };

  const getUserIdAndMoney = async (username) => {
    try {
      const response = await fetch(`https://localhost:7283/api/User/id-and-money/${username}`);
      if (!response.ok) {
        throw new Error("Eroare la obținerea datelor de la server.");
      }

      const data = await response.json();
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("money", data.money);
    } catch (error) {
      console.error("A aparut o eroare la obtinerea datelor de la server:", error);
    }
  };

  const getUserData = async (username) => {
    try {
      const response = await fetch(`https://localhost:7283/api/User/${username}`);
      if (!response.ok) {
        throw new Error("Eroare la obținerea datelor de la server.");
      }

      const data = await response.json();
      const encryptedIsAdmin = CryptoJS.AES.encrypt(data.isAdmin.toString(), 'secret-key').toString();
      Cookies.set('isAdmin', encryptedIsAdmin, { expires: 1 });
    } catch (error) {
      console.error("A aparut o eroare la obtinerea datelor de la server:", error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      marginRight: '-14%', 
    }}>

      <div>
        <style>
          {`
            body {
              background-image: url('https://static.vecteezy.com/system/resources/previews/022/751/492/non_2x/online-gaming-screen-panel-and-border-design-for-gamers-free-png.png');
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }
            .custom-btn {
              background-color: #00bfff;
              color: white;
              border: none;
              border-radius: 10px;
              box-shadow: 0 4px #999;
              transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .custom-btn:active {
              transform: translateY(4px);
              box-shadow: 0 2px #666;
            }
          `}
        </style>
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol sm="6">
              <MDBCol sm="auto">
                <MDBIcon icon="bi bi-controller" className="me-3" style={{ fontSize: "3rem", color: "#709085" }} />
                <h1 className="fw-bold mb-0">Digital Playground</h1>
              </MDBCol>

              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label={null}
                    placeholder="Nume utilizator"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label={null}
                    placeholder="Parola"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />
                  <div className="mx-5 mb-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="me-3"
                      style={{ cursor: "pointer" }}
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="small text-muted">Afiseaza parola</span>
                  </div>

                  <MDBBtn className='mb-4 custom-btn' color="info" size="lg" type="submit" style={{ width: '200px', height: '50px' }} >
                    <span style={{ width: '100%' }}>Autentificare</span>
                  </MDBBtn>
                </form>
                <p className="ms-5">
                  Nu ai un cont? <Link to="/signup" className="link-info">Inregistreaza-te aici</Link>
                </p>
              </div>
            </MDBCol>

            <MDBCol sm="6" className="px-0">
              <img
                src="https://cdn.pixabay.com/photo/2024/04/12/12/23/logo-8691886_640.jpg"
                alt="Login image"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default LoginForm;
