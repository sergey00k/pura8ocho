/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import whatsapp from '../assets/images/socialLogos/whatsapp.png'

// images
import check from '../assets/images/check-icon.png'
import upstairs from '../assets/images/ServicesImages/upstairs.jpeg'



////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import Button from '../components/Button';
import { BottomGradientBox } from '../components/Gradient';

///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FireAnimation from '../animations/FireAnimation';


const headerTextStyle = css`
  color: white;
  font-size: 24px;
  font-weight: bold;
  `;

const bodyTextStyle = css`
  color: white;
  font-size: 16px;
  `;

const extraSmallTextStyle = css`
  color: white;
  font-size: 12px;
  `;

  const fireStyle = css`
  position: absolute;
  z-index: 2;
  bottom: -6vh;
  `;

  const fireStyle2 = css`
  position: absolute;
  z-index: 2;
  bottom: -6vh;
  right: 0px
  `;



const SuccessPuraStay: React.FC = () => {
    const navigate = useNavigate(); 
    const userLanguage = navigator.language;



    return (
        <Box
            sx={{
                    // Set the height of the scrollable area
            paddingTop: 2,
            padding: 0,
            backgroundColor: 'black',
            alignItems: 'flex-start',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '82vh',
            }}
        >
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.25, width: '100%', height: '104%', alignItems: 'center'}}></Box>
            <img src={upstairs} style={{height: '90%', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{marginLeft: undefined, width: '100%', marginTop: '4vh', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <Box style={{position: 'relative', zIndex: 5, marginRight: '2vw', display: 'flex', marginBottom: '2vh', alignItems: 'center',}}>
                  <img src={check} style={{height: '3.6vh', width: '3.6vh', marginRight: '3vw', marginBottom: 0,}}></img>
                  <Text customCss={headerTextStyle} style={{position: 'relative', zIndex: 5, margin: 0}}>Success!</Text>
              </Box>
              <Text customCss={bodyTextStyle} style={{position: 'relative', zIndex: 5, textAlign: 'center', width: '60vw'}}>Your email is your booking, please show it to us upon your arrival.</Text>
            </Box>
            <Box style={{width: '100vw', zIndex: 3, alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: '2.6vh'}}>
              <Button text={'Return home'} onClick={() => { navigate('/'); document.body.style.overflow = 'auto';}} customCss={css`width: 52vw; height: 6vh; z-index: 3;`}></Button>
            </Box>
              <FireAnimation customStyles={fireStyle} />
              <FireAnimation customStyles={fireStyle2} />

        </Box>
    )
}

export default SuccessPuraStay