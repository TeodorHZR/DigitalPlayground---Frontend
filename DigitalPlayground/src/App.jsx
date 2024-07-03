import './App.css';
import React from 'react';
import LoginForm from './pages/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignUpForm from './pages/SignUpForm';
import Sidebar from "./components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Jocuri from './pages/Jocuri';
import Turnee from './pages/Turnee';
import Skins from './pages/Skins';
import Account from './pages/Account';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container fluid>
          <Row>
            <SidebarWithCondition />
            <Col lg={10} xs={12}>
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />  
                <Route path="/games" element={<PrivateRoute><Jocuri /></PrivateRoute>} /> 
                <Route path="/tournaments" element={<PrivateRoute><Turnee /></PrivateRoute>} />  
                <Route path="/skins" element={<PrivateRoute><Skins /></PrivateRoute>} />  
                <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />  
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />  
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

function SidebarWithCondition() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <Col lg={2}>
      <Sidebar />
    </Col>
  );
}

export default App;
