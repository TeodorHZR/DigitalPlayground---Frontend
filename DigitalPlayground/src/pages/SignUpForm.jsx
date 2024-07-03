import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { insertUser } from '../services/userService';
import './Signupform.css';
import confetti from 'canvas-confetti';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formComplete, setFormComplete] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const allFieldsFilled = Object.values(updatedFormData).every((val) => val !== '');
    setFormComplete(allFieldsFilled);
    setPasswordsMatch(updatedFormData.password === updatedFormData.confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      await insertUser(formData.username, formData.password);
      launchConfetti();

      setTimeout(() => {
        window.location.href = '/';
      }, 3000); 
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const launchConfetti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="pagina-signup" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      marginRight: '44%', 
    }}>
      <style>{'body { background-color: #f5f5dc; }'}</style>
      <MDBContainer fluid>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px', maxWidth: '800px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Alatura-te noua!</p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput
                    label={null}
                    placeholder='Nume/email'
                    id='username'
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleInputChange}
                    className='w-100'
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput
                    label={null}
                    placeholder='Parola'
                    id='password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput
                    label={null}
                    placeholder='Repeta parola'
                    id='confirmPassword'
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                {!passwordsMatch && (
                  <div className="text-danger mb-4">
                    Parolele nu coincid
                  </div>
                )}
                <MDBBtn
                  className='mb-4 custom-btn' 
                  style={{ width: '150px', height: '50px' }} 
                  size='lg'
                  disabled={!formComplete || !passwordsMatch}
                  onClick={handleSubmit}
                >
                  Sign Up
                </MDBBtn>
              </MDBCol>
              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <div><p className="extra-text">Descopera o comunitate vibranta de jucatori si bucura-te de continut exclusiv si interactiuni captivante!</p></div>
        <div className="side-text" style={{ marginRight: '250px', width: '500px', }}>
          <p className="text-alignment" style={{ fontSize: '24px' }}>DigitalPlayground se remarca ca fiind o destinatie online inovatoare pentru pasionatii de gaming din intreaga lume. Cu o abordare fresh si captivanta, acest site redefineste modul in care comunitatea gamerilor interactioneaza si se conecteaza.</p>
        </div>
      </MDBContainer>
    </div>
  );
}

export default SignUpForm;
