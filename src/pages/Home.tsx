/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';


////////// images ////////////////
import sauna from '../assets/images/irlImages/sauna.jpeg'
import statuePeople from '../assets/images/irlImages/statuePeople.jpeg'
import fire from '../assets/images/irlImages/fireClose.jpeg'
import stoneWall from '../assets/images/irlImages/stoneWall.jpg'
import thumbnail1 from '../assets/videos/thumbnail1.jpg'
import thumbnail2 from '../assets/videos/thumbnail2.jpg'
import thumbnail3 from '../assets/videos/thumbnail3.jpg'
//import starrySky from '../assets/images/nightsky.jpg'
import starrySky from '../assets/images/stars1.jpg'


////////// videos ///////////////
/*import videoOne from '../assets/videos/video-one.mp4'
import videoTwo from '../assets/videos/video2.mp4'
import videoThree from '../assets/videos/video3.mp4'*/

////////// animations //////////
import FireAnimation from "../animations/FireAnimation"

////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import Button from '../components/Button'
import VideoPlayer from '../components/VideoPlayer';
import { TopGradientBox, BottomGradientBox } from '../components/Gradient';

///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let headerFontSize = '22';
let bodyFontSize = '16';

if (screenHeight > 738) {
  headerFontSize = '26'
  bodyFontSize = '20'
}

const bodyTextStyle = css`
  color: white;
  font-size: ${bodyFontSize}px;
  `;

const extraSmallTextStyle = css`
  color: white;
  font-size: 12px;
  `;

const fireStyle = css`
  position: absolute;
  z-index: 2;
  top: 100px;
  `;

  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`

  const RotatingImage = styled.img`
  animation: ${rotate} 60s linear infinite;
  height: ${screenHeight}px;
  object-fit: cover;
  position: absolute;
  z-index: 1;
  width: 190%;
  top: -140px;
  left: -140px
`;


const fadeInHeader = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const headerTextStyle = css`
  color: white;
  font-size: ${headerFontSize}px;
  font-weight: bold;
  `;

const fadeInStyle = css`
  opacity: 0; /* Initially hidden */
  animation: ${fadeIn} 3s forwards; /* 2-second animation */
  font-size: 16px;
  color: white;
`;


const Home: React.FC = () => {
  const navigate = useNavigate(); 

  

    return (
      <Box
        sx={{
                  // Set the height of the scrollable area
          overflowY: 'scroll', // Enable vertical scrolling
          overflowX: 'hidden',
          paddingTop: 2,
          padding: 0,
          backgroundColor: 'black',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box style={{backgroundColor: 'black',position: 'relative', width: '100%', height: 300, alignItems: 'center'}}>
          <TopGradientBox customStyle={{top: undefined, bottom: 0, height: 26, width: '100%'}} />
          <img src={sauna} style={{height: 300, position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <FireAnimation customStyles={fireStyle} />
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 3, opacity: 0.3, width: '100%', height: 300, alignItems: 'center'}}></Box>
          <Text customCss={[headerTextStyle, css`  opacity: 0;  animation: ${fadeInHeader} 3s forwards;`]} style={{position: 'absolute', bottom: '1%', left: '48%', textAlign: 'right', width: '46%', zIndex: 4,}}>{'Peace, Relaxation, Community.'}</Text>
        </Box>

        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', height: 520, alignItems: 'flex-end'}}>
          <img src={statuePeople} style={{height: 520,objectFit: 'cover',  transform: 'scaleX(-1)', position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.3, width: '100%', height: 520, alignItems: 'center'}}></Box>

          <Box style={{ zIndex: 3, width: '100%' }}>
            <Text customCss={[headerTextStyle, css`  opacity: 0;  animation: ${fadeInHeader} 3s forwards;`]} style={{  zIndex: 3,marginLeft: 32,  marginTop: 32}}>At Pura8ocho...</Text>
            <Text customCss={fadeInStyle} style={{  zIndex: 3, marginLeft: 32, opacity: 0.8, marginTop: 32}}>You'll find a hot natural sauna,<br />a flower filled ice bath,<br />a warm healthy environment<br /> and a community like no other.<br /><br />Here we all share the<br /> same goal of relaxing,<br /> reenergizing, connecting.</Text>
          </Box>
          <Box style={{display: 'flex', marginRight: 32, zIndex: 4, flexDirection: 'column',}}>
            <Button customCss={css`margin-top: 0px; margin-bottom: 0px;`} onClick={() => navigate('/booking')} text={'Book a sauna'} />
            <Button onClick={() => navigate('/bookingPrivate')} text={'Book a private sauna'} />
          </Box>
          <TopGradientBox customStyle={{top: undefined, bottom: 0, height: 26, width: '100%'}} />

        </Box>
        
        <Box style={{backgroundColor: 'black', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '36vh'}}>
          <Text customCss={headerTextStyle} style={{ marginLeft: 32, width: '100%', position: 'relative', zIndex: 5, marginTop: 20}}>Check out the atmosphere...</Text>

          <Box style={{display: 'flex',  flexDirection: 'row', position: 'relative', width: '100%'}}>
            <VideoPlayer videoPath={require('../assets/videos/video-one.mp4')} thumbnailPath={thumbnail1}/>
            <VideoPlayer videoPath={require('../assets/videos/video2.mp4')} thumbnailPath={thumbnail2}/>
            <VideoPlayer videoPath={require('../assets/videos/video3.mp4')} thumbnailPath={thumbnail3}/>
          </Box>
        </Box>
        <Box style={{backgroundColor: 'black', overflow: 'hidden', position: 'relative', zIndex: 1, paddingTop: screenHeight * 0.04, paddingBottom: screenHeight * 0.04, width: '100%', display: 'flex', flexDirection: 'column', height: screenHeight * 0.52,}}>
          
            <Text customCss={headerTextStyle} style={{ marginTop: 0, marginBottom: screenHeight * 0.06, marginLeft: 32,  position: 'relative', zIndex: 4}}>About Pura8ocho</Text>
            <RotatingImage 
        src={starrySky} 
        alt="Starry Sky"
      />
                <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 3, opacity: 0.4, width: '100%', height: screenHeight * 0.8, top: -(screenHeight * 0.05), alignItems: 'center'}}></Box>

            <Box style={{ width: '83%',marginLeft: 32, opacity: 0.8,  position: 'relative', zIndex: 4, borderBottomWidth: 1, borderTopWidth: 1, borderTopStyle: 'solid',borderBottomStyle: 'solid', paddingTop: 20, paddingBottom: 20, borderColor: 'white'}}>
              <Text customCss={bodyTextStyle} style={{margin: 0}} >Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum v vLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</Text>
            </Box>
        </Box>
        <Box style={{backgroundColor: 'black', width: screenWidth, display: 'flex',overflow: 'hidden', position: 'relative', flexDirection: 'column', height: 230, alignItems: 'center'}}>
          <img src={stoneWall} style={{width: screenWidth,position: 'absolute', zIndex: 1,  objectFit: 'cover', height: 230}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.6, width: '100%', marginTop: -1, height: 231, alignItems: 'center'}}></Box>
          <Text customCss={headerTextStyle} style={{marginTop: 20, marginBottom: 16, zIndex: 3,  'textAlign': 'center',}}>Sauna schedule</Text>
          

          <Box style={{ flexDirection: 'column', alignItems: 'center', width: '90%', zIndex: 4, justifyContent: 'space-between', display: 'flex'}}>
            <Button customCss={css`height: 36px; width: 180px; margin-top: 0px; margin-bottom: 4px`} onClick={() => navigate('/bookingPrivate')} text={'Public'} />

            <Button customCss={css`height: 36px; width: 180px; margin-bottom: 4px`} onClick={() => navigate('/bookingPrivate')} text={"Women's only"} />

            <Button customCss={css`height: 36px; width: 180px; margin-bottom: 4px`} onClick={() => navigate('/bookingPrivate')} text={'Private'} />

          </Box>

        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 520, position: 'relative', alignItems: 'flex-end'}}>
          <Box style={{ zIndex: 3, width: '100%' }}>
            <Text customCss={headerTextStyle} style={{width: '100%', zIndex: 3, marginLeft: 32, marginTop: 40}}>Experience it for yourself.</Text>
          </Box>
          <img src={fire} style={{height: 520, objectFit: 'cover', position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.3, width: '100%', height: 520, alignItems: 'center'}}></Box>
          <Box style={{display: 'flex', zIndex: 4,marginRight: 32, flexDirection: 'column',}}>
            <Button customCss={css`margin-top: 0px; margin-bottom: 0px;`} onClick={() => navigate('/booking')} text={'Book a sauna'} />
            <Button onClick={() => navigate('/bookingPrivate')} text={'Book a private sauna'} />
          </Box>
          <TopGradientBox customStyle={{top: undefined, bottom: 0, height: 26, width: '100%'}} />
        </Box>
        <Box style={{ padding: 16, alignItems: 'center'}}>
          <Footer />
        </Box>
      </Box>
    );
  };
  
  export default Home;