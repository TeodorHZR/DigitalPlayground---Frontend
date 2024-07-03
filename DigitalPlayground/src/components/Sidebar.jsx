import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { getCategories } from "../services/categoryService"; 
const Sidebar = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdminCookie = Cookies.get('isAdmin');
    if (isAdminCookie) {
      const bytes = CryptoJS.AES.decrypt(isAdminCookie, 'secret-key');
      setIsAdmin(bytes.toString(CryptoJS.enc.Utf8) === 'true');
    }

    if (location.pathname === '/games') {
      const fetchData = async () => {
        try {
          const data = await getCategories(0, 100, 'asc'); 
          setCategories(data);
        } catch (error) {
          console.error("Eroare la obtinerea categoriilor:", error);
        }
      };
      fetchData();
    }
  }, [location]);

  const linkStyle = { color: location.pathname === '/account' ? 'black' : 'white' };

  return (
    <div>
      <Nav className="col-md-12 d-md-block bg-light sidebar">
        <div className="sidebar-sticky"></div>
        {isAdmin && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin" style={linkStyle}>
              Admin
            </Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link as={Link} to="/account" style={linkStyle}>
            Contul tau
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/home" style={linkStyle}>
            Acasa
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/games" style={linkStyle}>
            Jocuri
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/tournaments" style={linkStyle}>
            Turnee
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/skins" style={linkStyle}>
            Skin-uri
          </Nav.Link>
        </Nav.Item>
        {location.pathname === '/games' && (
          <div>
            <h2>Categorii</h2>
            <ul>
              {categories.map(category => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
