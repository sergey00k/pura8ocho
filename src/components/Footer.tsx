/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import facebook from '../assets/images/socialLogos/facebook.png'
import whatsapp from '../assets/images/socialLogos/whatsapp.png'
import instagram from '../assets/images/socialLogos/instagram.png'
import gmail from '../assets/images/socialLogos/gmail.png'
import check from '../assets/images/check-icon.png'

////////// components /////////////////
import Text from '../components/Text'

///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide, Button } from '@mui/material';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('')
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false)
  
    const socialButtonStyles = css`
      border: 'transparent';
      background: 'transparent';
      marginTop: 2;
      marginBottom: 2;
      flexDirection: 'row';
    `
  

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
  
    const externalUrlRedirection = (url: string) => {
      window.location.href = url;
    };
  
    const sendEmail = async ( email: string ) => {
      setEmailExistsError(false)
  
      
      const lowerCaseEmail = email.toLowerCase()
      setEmail(lowerCaseEmail)
  
      if (!lowerCaseEmail.includes('@')) {
        setEmailExistsError(true)
        return
      }
  
      const emailListRef = collection(db, 'emailList');
      const q = query(emailListRef, where('email', '==', lowerCaseEmail));
      const querySnapshot = await getDocs(q);
  
  
      if (!querySnapshot.empty) {
        setEmailExistsError(true)
        return
      }
      
      try {
        await setDoc(doc(db, 'emailList', lowerCaseEmail), {
          email: lowerCaseEmail,
          discount10: true,
          used: false
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
  
      setEmailConfirmed(true)
  
    }
    
    return (
        <Box style={{backgroundColor: 'transparent', width: '100%', alignItems: 'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'transparent', width: '80%' }} >
            <Text customCss={headerTextStyle}>Socials</Text>
            <button onClick={() => externalUrlRedirection('url')} style={{ paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <img src={whatsapp} style={{height: 18, width: 18, marginRight: 12}}></img>
              <Text customCss={bodyTextStyle} >WhatsApp</Text>
            </button>
            <button onClick={() => externalUrlRedirection('url')} style={{ paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <img src={instagram} style={{height: 18, width: 18, marginRight: 12}}></img>
              <Text customCss={bodyTextStyle}>Instagram</Text>
            </button>
            <button onClick={() => externalUrlRedirection('url')} style={{ paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <img src={facebook} style={{height: 18, width: 18, marginRight: 12}}></img>
              <Text customCss={bodyTextStyle}>Facebook</Text>
            </button>
            <button onClick={() => externalUrlRedirection('url')} style={{ paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <img src={gmail} style={{height: 18, width: 18, marginRight: 12}}></img>
              <Text customCss={bodyTextStyle}>Email</Text>
            </button>
          </Box>
          <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
            <Text customCss={headerTextStyle} style={{ marginBottom: 6, textAlign: 'center'}}>Enjoy 10% off your next visit</Text>
            {!emailConfirmed ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                {emailExistsError && (<Text customCss={extraSmallTextStyle} style={{color: 'red', textAlign: 'center', marginBottom: 8, marginTop: 8}}>Entered email is not valid.</Text>)}
                <input placeholder={'Enter your email...'} onChange={e => setEmail(e.target.value)} style={{ color: 'black',marginTop: 6, backgroundColor: 'whitesmoke', borderRadius: 20, height: 18, marginBottom: 18 }}></input>
                <button onClick={() => sendEmail(email)} style={{ color: 'white', backgroundColor: '#4F4F4F', borderRadius: 30, width: 100, height: 28, border: 'none'}}>Get 10% Off</button>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <img src={check} style={{height: 60, width: 60}}></img>
                <Text customCss={bodyTextStyle} style={{textAlign: 'center'}}>Enter your email at checkout to receive 10% off</Text>
              </div>
            )}
          </Box>
        </Box>
        <Text customCss={extraSmallTextStyle} style={{ textAlign: 'center', marginBottom: 10}}>Pura8ocho © 2021</Text>
      </Box>
    )
}

export default Footer