/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import whatsapp from '../assets/images/socialLogos/whatsapp.png'

// images
import thePath from '../assets/images/backgrounds/thePath.webp'

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

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const isLargeScreen = (screenWidth >= 400 && screenHeight >= 730);


const headerTextStyle = css`
  color: white;
  font-size: 22px;
  font-weight: bold;
  `;

const bodyTextStyle = css`
  color: white;
  font-size: 14px;
  `;

const extraSmallTextStyle = css`
  color: white;
  font-size: 12px;
  `;



const AllBookings: React.FC = () => {
    const navigate = useNavigate(); 


    return (
        <Box
            sx={{
                    // Set the height of the scrollable area
            paddingTop: 2,
            padding: 0,
            backgroundColor: 'black',
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: isLargeScreen ? '84vh' : '82vh',
            }}
        >
            <BottomGradientBox />
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.3, width: '100%', height: '100%', alignItems: 'center'}}></Box>
            <img src={thePath} style={{height: '100%', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Text customCss={headerTextStyle} style={{position: 'relative', zIndex: 5,}}>Choose your path</Text>
            <Box style={{display: 'flex', alignItems: 'center', flexDirection: 'row', position: 'relative', zIndex: 2, justifyContent: 'space-between', width: '110%'}}>
                <Button text={'PuraSauna'} onClick={() => { navigate('/sauna'); document.body.style.overflow = 'auto';}} customCss={css`width: 52vw; height: 7vh`}></Button>
                <Button text={'PuraStay'} onClick={() => { navigate('/rooms'); document.body.style.overflow = 'auto'; }} customCss={css`width: 52vw; height: 7vh`}></Button>
            </Box>
        </Box>
    )
}

export default AllBookings