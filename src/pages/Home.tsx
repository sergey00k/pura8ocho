/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import whatsapp from '../assets/images/socialLogos/whatsapp.png'

////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'

///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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


const Home: React.FC = () => {
  const navigate = useNavigate(); 

    return (
      <Box
        sx={{
                  // Set the height of the scrollable area
          overflowY: 'scroll', // Enable vertical scrolling
          padding: 2,
          backgroundColor: 'black'
        }}
      >
        <Box style={{backgroundColor: 'black',position: 'relative', width: '100%', height: 260, alignItems: 'center'}}>
          <img src={whatsapp} style={{height: 260, position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <Box style={{backgroundColor: 'grey',position: 'absolute', zIndex: 2, opacity: 0.4, width: '100%', height: 260, alignItems: 'center'}}></Box>
          <Text customCss={headerTextStyle} style={{position: 'absolute', top: '54%', left: '46%', textAlign: 'right', width: '50%', zIndex: 2,}}>Peace, Relaxation, Community.</Text>
        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 460, alignItems: 'center'}}>
          <Text customCss={headerTextStyle} style={{'textAlign': 'center', marginTop: 40}}>Relax, reenergize and connect.</Text>
          <Box style={{display: 'flex', flexDirection: 'column',}}>
            <button onClick={() => navigate('/booking')} style={{ color: 'white', backgroundColor: '#6A0DAD', borderRadius: 30,padding: 10, height: 40, width: 200, border: 'none'}}>
              Book a sauna
            </button>
            <button onClick={() => navigate('/bookingPrivate')} style={{ marginTop: 20, marginBottom: 20, color: 'white', backgroundColor: '#6A0DAD', borderRadius: 30, padding: 10, height: 40, width: 200, border: 'none'}}>
              Book a private sauna
            </button>
          </Box>
        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 260, alignItems: 'center'}}>
          <Text customCss={headerTextStyle} style={{'textAlign': 'center', marginTop: 20}}>Check out the atmosphere...</Text>
          <Box style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          </Box>
        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 320, alignItems: 'center'}}>
          
            <Text customCss={headerTextStyle} style={{marginTop: 40, 'textAlign': 'center',}}>About Pura8ocho</Text>
          <Box style={{ borderBottomWidth: 1, borderTopWidth: 1, borderTopStyle: 'solid',borderBottomStyle: 'solid', paddingTop: 20, paddingBottom: 20, borderColor: 'white'}}>
            <Text customCss={bodyTextStyle} style={{textAlign: 'center'}}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum v vLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</Text>
          </Box>
        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', height: 260, alignItems: 'center'}}>
          
          <Text customCss={headerTextStyle} style={{marginTop: 40, 'textAlign': 'center',}}>Our schedule</Text>
        <Box style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', display: 'flex'}}>
          <Box>
            <Text customCss={bodyTextStyle} style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginBottom: 20}}>Public Sauna</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 6, textAlign: 'center'}}>Tuesday</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 16, textAlign: 'center'}}>6pm - 10pm</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 6, textAlign: 'center'}}>Friday</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 16, textAlign: 'center'}}>6pm - 10pm</Text>
          </Box>
          <Box>
            <Text customCss={bodyTextStyle} style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginBottom: 20}}>Women Only Sauna</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 6, textAlign: 'center'}}>Tuesday</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 16, textAlign: 'center'}}>6pm - 10pm</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 6, textAlign: 'center'}}>Friday</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 16, textAlign: 'center'}}>6pm - 10pm</Text>
          </Box>
          <Box>
            <Text customCss={bodyTextStyle} style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginBottom: 20}}>Private Sauna</Text>
            <Text customCss={extraSmallTextStyle} style={{marginBottom: 6, textAlign: 'center'}}>Choose your own<br /> schedule available<br /> upon request</Text>
          </Box>
        </Box>
      </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 460, alignItems: 'center'}}>
          <Text customCss={headerTextStyle} style={{'textAlign': 'center', marginTop: 40}}>Experience it for yourself.</Text>
          <Box style={{display: 'flex', flexDirection: 'column',}}>
            <button onClick={() => navigate('/booking')} style={{ color: 'white', backgroundColor: '#6A0DAD', borderRadius: 30,padding: 10, height: 40, width: 200, border: 'none'}}>
              Book a sauna
            </button>
            <button onClick={() => navigate('/bookingPrivate')} style={{ marginTop: 20, marginBottom: 20, color: 'white', backgroundColor: '#6A0DAD', borderRadius: 30, padding: 10, height: 40, width: 200, border: 'none'}}>
              Book a private sauna
            </button>
          </Box>
        </Box>
        <Footer />
      </Box>
    );
  };
  
  export default Home;