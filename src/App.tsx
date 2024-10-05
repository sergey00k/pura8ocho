/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';


import { Modal, Box, Slide, Button } from '@mui/material';

////////// page imports ///////////////
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingPrivate from './pages/BookingPrivate';


////////// animation imports ///////////////
import CSSMistAnimation from './animations/MistAnimation'
import { relative } from 'path';

interface ButtonProps {
  primary?: boolean;
}



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
            width: 120,
            bgcolor: 'black',
            boxShadow: 24,
            paddingTop: 4,
            paddingLeft: 0
          }}
        >
          <h2 style={{ marginLeft: 4}}>Home</h2>
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