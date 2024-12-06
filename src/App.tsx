/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';


import { Modal, Box, Slide } from '@mui/material';

////////// page imports ///////////////
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingPrivate from './pages/BookingPrivate';


////////// animation imports ///////////////
import CSSMistAnimation from './animations/MistAnimation'
import { relative } from 'path';

import Text from './components/Text';

interface ButtonProps {
  primary?: boolean;
}

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let headerFontSize = '16';
let bodyFontSize = '16';

if (screenHeight > 738) {
  headerFontSize = '20'
  bodyFontSize = '20'
}

const headerTextStyle = css`
  color: white;
  font-size: ${headerFontSize}px;
  font-weight: bold;
  `;

    /* test button style :
      border-radius: 20px;

  */

  const Button = styled.button`
  background: linear-gradient(155deg, black 46%, #ff7f50 100%); /* Fade from black to orange */
  color: #f5f5f5;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  cursor: pointer;
  padding: 10px;
  justify-content: flex-start;
  display: flex;
  border-right-color: #ff7f50;
  border-bottom-color: #ff7f50;
  border-style: solid;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  margin-bottom: 38px;

  /* Hover effect */
  &:hover {
    background: linear-gradient(135deg, black 0%, #6a0dad 100%); /* Fade from black to light purple */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  /* Optional: Border animation */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  &::before {
    top: 0;
    transform: scaleX(0);
    transform-origin: left;
  }

  &::after {
    bottom: 0;
    transform: scaleX(0);
    transform-origin: right;
  }

  &:hover::before,
  &:hover::after {
    transform: scaleX(1);
  }
`;



const HeaderMenu: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <header style={{ paddingRight: '20px', height: 60, paddingLeft: '20px', background: 'black' }}>
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
            <div></div>
            <button style={{background: 'none', border: 'none'}}onClick={openModal}>
              <IonIcon icon={menuOutline} style={{ fontSize: '40px', color: 'white' }} />
            </button>
          </ul>
        </nav>
      </header>
      <Modal open={isModalOpen} onClose={closeModal} style={{ outline: 'none' }}>
        <Slide direction="left" style={{ outline: 'none' }} in={isModalOpen} mountOnEnter unmountOnExit>
        <Box 
          sx={{
            position: 'absolute',
            justifyContent: 'space-between',
            top: 0,
            bottom: 0,
            right: 0,
            width: screenWidth * 0.3,
            bgcolor: 'black',
            boxShadow: 24,
            paddingTop: 4,
            paddingLeft: screenWidth * 0.005,
            paddingRight: screenWidth * 0.005

          }}
        >
          <Box style={{ display: 'flex', flexDirection: 'column'}}>
            <Button>
              <Text customCss={headerTextStyle} style={{ margin: 0}}>Home</Text>
            </Button>
            <Button>
              <Text customCss={headerTextStyle} style={{ margin: 0}}>Bookings</Text>
            </Button>
            <Button>
              <Text customCss={headerTextStyle} style={{ margin: 0}}>Services</Text>
            </Button>
            <Button>
              <Text customCss={headerTextStyle} style={{ margin: 0}}>Info</Text>
            </Button>
          </Box>
            <CSSMistAnimation />
        </Box>
        </Slide>
      </Modal>
    </div>
  )
}


const App: React.FC = () => {
  useEffect(() => {
    // Setting the global styles for the root HTML element
    document.documentElement.style.setProperty('color-scheme', 'dark');
    document.documentElement.style.setProperty('background-color', '#000000', 'important'); // Black background
    document.documentElement.style.setProperty('color', '#FFFFFF', 'important'); // White text for contrast
  }, []);  // Runs once when the component mounts
  return (
    <Router>
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingPrivate" element={<BookingPrivate />} />
      </Routes>
    </Router>
  );
};


export default App;