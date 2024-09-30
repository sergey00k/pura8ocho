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

const Booking: React.FC = () => {
    return (
        <Box></Box>
    )
}

export default Booking