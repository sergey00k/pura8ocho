/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import whatsapp from '../assets/images/socialLogos/whatsapp.png'

// images
import wood from '../assets/images/ServicesImages/wood.jpeg'
import sofas from '../assets/images/ServicesImages/sofas.jpeg'
import fire from '../assets/images/ServicesImages/fire.jpeg'

import check from '../assets/images/check-icon.png'


////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import Button from '../components/Button';
import { TopGradientBox, BottomGradientBox } from '../components/Gradient';

///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const headerTextStyle = css`
  color: white;
  font-size: 20px;
  font-weight: bold;
  `;

const bodyTextStyle = css`
  color: white;
  font-size: 14px;
  opacity: 0.7;
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



const Info: React.FC = () => {
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
            width: '100%',
            flexDirection: 'column',
            minHeight: '82vh',
            }}
        >
            <Box style={{position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: '72vh',}}>
            <BottomGradientBox customStyle={{height: '6vh', top: 0, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))'}} />

                <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.54, width: '100%', height: '72vh', alignItems: 'center'}}></Box>
                <img src={wood} style={{height: '72vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
                <Box style={{marginLeft: '7vw', marginTop: '1vh', paddingBottom: '2vh', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>{userLanguage.slice(0,2) === 'en' ? "Where is Pura8ocho?" : "Где находится Pura8ocho?"}</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative', marginBottom: '2vh'}}>{userLanguage.slice(0,2) === 'en' ? "Pura8ocho is located in Bali, Pererenan. Follow the following link to get the exact google map location." : "Pura8ocho находится на Бали, в Переренане. Перейдите по следующей ссылке, чтобы получить точное местоположение на Google Maps."}</Text>
                    <a href={'https://maps.app.goo.gl/q8PoxguY73eZQuoz6'} >{userLanguage.slice(0,2) === 'en' ? "Press here." : "Нажмите здесь."}</a>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0,}}>{userLanguage.slice(0,2) === 'en' ? "Can I buy my ticket upon arrival?" : "Могу ли я купить билет при регистрации?"}</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>{userLanguage.slice(0,2) === 'en' ? "Yes, however we have limited spots available so there is a possibility of getting denied entry, so a booking in advance is preferred." : "Да, однако у нас ограниченное количество мест, поэтому существует вероятность отказа в входе, поэтому бронирование заранее предпочтительнее."}</Text>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>{userLanguage.slice(0,2) === 'en' ? "I booked online and did not receive a ticket in my email inbox." : "Я забронировал онлайн, но не получил билет в мой почтовый ящик."}</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>{userLanguage.slice(0,2) === 'en' ? "Don't worry! We saved your email address when you made the booking so just tell us your email upon arrival." : "Не переживайте! Мы сохранили ваш адрес электронной почты, когда вы сделали бронирование, просто скажите нам свой email при регистрации."}</Text>
                </Box>
                <TopGradientBox customStyle={{height: '6vh', top: undefined, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

            </Box>
            <Box style={{position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: '72vh',}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>

                <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.54, width: '100%', height: '72vh', alignItems: 'center'}}></Box>
                <img src={fire} style={{height: '72vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
                <Box style={{marginLeft: '7vw', marginTop: '1vh', paddingBottom: '2vh', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>Where is Pura8ocho?</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative', marginBottom: '2vh'}}>Pura8ocho is located in Bali, Pererenan. Follow the following link to get the exact google map location.</Text>
                    <a href={'https://maps.app.goo.gl/q8PoxguY73eZQuoz6'} >Press here.</a>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0,}}>Can I buy my ticket upon arrival?</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>Yes, however we have limited spots available so there is a possibility of getting denied entry, so a booking in advance is preferred.</Text>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>I booked online and did not receive a ticket in my email inbox.</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>Don't worry! We saved your email address when you made the booking so just tell us your email upon arrival.</Text>
                </Box>
                <TopGradientBox customStyle={{height: '6vh', top: undefined, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

            </Box>
            <Box style={{position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: '72vh',}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>

            <TopGradientBox customStyle={{height: '6vh', top: undefined, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

                <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.64, width: '100%', height: '72vh', alignItems: 'center'}}></Box>
                <img src={sofas} style={{height: '72vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
                <Box style={{marginLeft: '7vw', marginTop: '1vh', paddingBottom: '2vh', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>Where is Pura8ocho?</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative', marginBottom: '2vh'}}>Pura8ocho is located in Bali, Pererenan. Follow the following link to get the exact google map location.</Text>
                    <a href={'https://maps.app.goo.gl/q8PoxguY73eZQuoz6'} >Press here.</a>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0,}}>Can I buy my ticket upon arrival?</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>Yes, however we have limited spots available so there is a possibility of getting denied entry, so a booking in advance is preferred.</Text>
                </Box>
                <Box style={{marginLeft: '7vw', marginBottom: '3vh', borderColor: 'white', borderBottomStyle: 'solid',borderBottomWidth: '0.5px', position: 'relative', zIndex: 3, width: '86vw'}}>
                    <Text customCss={headerTextStyle} style={{position: 'relative', marginBottom: 0}}>I booked online and did not receive a ticket in my email inbox.</Text>
                    <Text customCss={bodyTextStyle} style={{position: 'relative',}}>Don't worry! We saved your email address when you made the booking so just tell us your email upon arrival.</Text>
                </Box>

            </Box>
            <Footer />

        </Box>
    )
}

export default Info