import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        marginBottom: "50px",
        borderTop: "1px solid #ccc",
        color : "white"
      }}
    >
      <div>
        <h2>Contact</h2>
        <p>
          <a href="mailto:mteodor960@gmail.com" className="d-flex align-items-center" style={{ color: "white" }}>
            <MDBIcon icon="envelope" className="me-2" /> mteodor960@gmail.com
          </a>
          <br />
          <a href="tel:+40729404349" className="d-flex align-items-center" style={{ color: "white" }}>
            <MDBIcon icon="phone" className="me-2" /> +40 729 404 349
          </a>
        </p>
      </div>
      <div >
        <h2>Link-uri social media</h2>
        <p className="ms-auto" >
          <a href="https://github.com/TeodorHZR" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
            <i class="fab fa-github pr-1"></i> GitHub
          </a>
          <br />
          <a href="https://www.instagram.com/teom_09" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
            <MDBIcon fab icon="instagram" className="pr-1" /> Instagram
          </a>
          <br />
          <a href="https://www.linkedin.com/in/teodor-mihai-catrina-4a213a289/" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
            <i class="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;