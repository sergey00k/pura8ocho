/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import { logoWhatsapp, mailOutline, paperPlaneOutline, logoInstagram } from 'ionicons/icons';
import facebook from '../assets/images/socialLogos/facebook.png'
import whatsapp from '../assets/images/socialLogos/whatsapp.png'
import instagram from '../assets/images/socialLogos/instagram.png'
import gmail from '../assets/images/socialLogos/gmail.png'
import check from '../assets/images/check-icon.png'

////////// components /////////////////
import Text from '../components/Text'
import Button from '../components/Button'


///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';

const Footer: React.FC = () => {
    const userLanguage = navigator.language;
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
      window.open(url, '_blank'); 
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
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '2vw', justifyContent: 'space-between' }}>
          <Box sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'transparent', width: '80%' }} >
            <Text customCss={headerTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Socials' : 'Соцсети'}</Text>
            <button onClick={() => externalUrlRedirection('https://wa.me/6287885191204')} style={{ height: 40,paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <IonIcon icon={logoWhatsapp} style={{color: 'white', height: 18, width: 18, marginRight: 10}} />
              <Text customCss={bodyTextStyle} >{userLanguage.slice(0,2) === 'en' ? 'WhatsApp' : 'WhatsApp'}</Text>
            </button>
            <button onClick={() => externalUrlRedirection('https://www.instagram.com/pura8ocho/')} style={{ height: 40,paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <IonIcon icon={logoInstagram} style={{color: 'white', height: 18, width: 18, marginRight: 10}} />
              <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Instagram' : 'Instagram'}</Text>
            </button>
            <button onClick={() => externalUrlRedirection('https://t.me/puraocho')} style={{ height: 40,paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <IonIcon icon={paperPlaneOutline} style={{color: 'white', height: 18, width: 18, marginRight: 10}} />
              <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Telegram' : 'Telegram'}</Text>
            </button>
            <button onClick={() => externalUrlRedirection('mailto:pura8ocho@gmail.com')} style={{ height: 40, paddingLeft: 0, border: 'none', background: 'none', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <IonIcon icon={mailOutline} style={{color: 'white', height: 18, width: 18, marginRight: 10}} />
              <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Email' : 'почта'}</Text>
            </button>
          </Box>
          <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center',marginRight: '2vw', width: '80%'}}>
            <Text customCss={headerTextStyle} style={{ marginBottom: '4.2vh', width: 200, textAlign: 'left'}}>{userLanguage.slice(0,2) === 'en' ? 'Enjoy 10% off your next visit' : 'Получите скидку 10% на следующий визит'}</Text>
            {!emailConfirmed ? (
              <div style={{display: 'flex', flexDirection: 'column', width: 200, alignItems: 'flex-start',}}>
                {emailExistsError && (<Text customCss={extraSmallTextStyle} style={{color: 'red', textAlign: 'center', marginBottom: 8, marginTop: 8}}>{userLanguage.slice(0,2) === 'en' ? 'Entered email is not valid.' : ''}</Text>)}
                <Box style={{
        background: 'linear-gradient(to right, #5A0C9D, #9F2D99)',
        padding: '1%',
        borderRadius: 20,
        marginTop: 6,
        marginBottom: '4.2vh'
    }}>
                <input placeholder={userLanguage.slice(0,2) === 'en' ? 'Enter your email...' : 'Введите свой email...'} onChange={e => setEmail(e.target.value)} style={{ color: 'white', backgroundColor: 'black', borderColor: 'transparent', borderRadius: 20, height: 24, width: 160, }}></input>
                </Box>
                <Button onClick={() => sendEmail(email)} text={userLanguage.slice(0,2) === 'en' ? 'Get 10% Off' : 'Скидка 10%'} customCss={css`width: 126px; font-size: 14px; margin-top: 6px; margin-bottom: 0px; height: 36px`} />
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