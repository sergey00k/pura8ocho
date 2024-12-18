/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';

////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation';

// images
import hats from '../assets/images/ServicesImages/hats.jpeg'
import ice from '../assets/images/ServicesImages/ice.jpeg'
import massage from '../assets/images/ServicesImages/massage.jpeg'
import tea from '../assets/images/irlImages/teaClose.jpeg'
import fire from '../assets/images/irlImages/fireClose.jpeg'
import upstairs from '../assets/images/ServicesImages/upstairs.jpeg'
import sofas2 from '../assets/images/ServicesImages/sofas2.jpeg'







///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide, Button } from '@mui/material';

import { TopGradientBox, BottomGradientBox } from '../components/Gradient';

const headerTextStyle = css`
  color: white;
  font-size: 22px;
  font-weight: bold;
  `;

const bodyTextStyle1 = css`
  color: white;
  font-size: 15px;
  `;

const bodyTextStyle2 = css`
  color: white;
  font-size: 14px;
  `;

const extraSmallTextStyle = css`
  color: white;
  font-size: 12px;
  `;

const Services: React.FC = () => {
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
          <Box style={{height: '70vh',position: 'relative', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '6vh', top: 0, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))'}} />
            <ScrollAnimation startOffsetPoint={0}>
              <Text customCss={headerTextStyle} style={{marginLeft: '4vw'}}>PuraSauna</Text>
              <Text customCss={bodyTextStyle1} style={{marginLeft: '4vw', marginTop: '8vh', width: '40vw', lineHeight: 1.8}}>Bask in the heat and peacful relaxation of PuraSauna where state of mind is purified and refreshed.</Text>
            </ScrollAnimation>
            <img src={hats} style={{height: '70vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '70vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '6vh', top: undefined, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

          </Box>
          <Box style={{display: 'flex',position: 'relative', height: '36vh', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>
            <ScrollAnimation direction={'-'} startOffsetPoint={400} notAnimated={true} customStyle={{alignItems: 'flex-end', display: 'flex', justifyContent: 'space-between', height: '36vh', flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{marginRight: '4vw'}}>Ice Bath</Text>
              <Text customCss={bodyTextStyle2} style={{marginRight: '4vw', marginTop: '4vh', width: '24vw', textAlign: 'left', lineHeight: 1.8}}>Feel the rush of dopamine followed by relief with our ice cold bath.</Text>
            </ScrollAnimation>
            <img src={ice} style={{height: '36vh', width: '34vh', position: 'absolute', left: 0, zIndex: 1}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '36vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '4vh', top: undefined, bottom: 0}}/>
            <TopGradientBox customStyle={{height: '36vh', width: '4vh', top: undefined, left: '30vh', background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

          </Box>
          <Box style={{display: 'flex',position: 'relative', height: '40vh', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>
            <img src={massage} style={{height: '40vh', position: 'absolute', right: 0, width: '32vh'}}></img>
            <ScrollAnimation startOffsetPoint={600} notAnimated={true} customStyle={{boxSizing: 'border-box', paddingBottom: '1vh', display: 'flex', justifyContent: 'space-between', height: '40vh', flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{marginLeft: '4vw', marginBottom: 0}}>Massage</Text>
              <Text customCss={bodyTextStyle2} style={{marginLeft: '4vw', width: '28vw', lineHeight: 1.8}}>Elevate your deep recovery with a massage to put your mind and body in a state of complete relaxation.</Text>
            </ScrollAnimation>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '40vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '4vh', top: undefined, bottom: 0}}/>

          </Box>
          <Box style={{display: 'flex',position: 'relative', height: '48vh', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>

            <ScrollAnimation direction={'-'} startOffsetPoint={800} notAnimated={true} customStyle={{alignItems: 'flex-end',boxSizing: 'border-box', paddingBottom: '3vh', display: 'flex', justifyContent: 'space-between', height: '48vh', flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{marginRight: '4vw', marginBottom: 0, textAlign: 'left', width: '24vw'}}>Tea</Text>
              <Text customCss={bodyTextStyle2} style={{marginRight: '4vw', width: '24vw', textAlign: 'left', lineHeight: 1.8}}>Enjoy fresh tea from our tea master's ceremony and enter an uplifting state of wellbeing.</Text>
            </ScrollAnimation>
            <img src={tea} style={{height: '48vh', width: '34vh', position: 'absolute', left: 0, zIndex: 1}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '48vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '4vh', top: undefined, bottom: 0}}/>
            <TopGradientBox customStyle={{height: '48vh', width: '4vh', top: undefined, left: '30vh', background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

          </Box>
          <Box style={{display: 'flex',position: 'relative', height: '40vh', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>
            <img src={fire} style={{height: '40vh', position: 'absolute', right: 0, width: '32vh'}}></img>
            <ScrollAnimation startOffsetPoint={600} notAnimated={true} customStyle={{boxSizing: 'border-box', paddingBottom: '3vh', display: 'flex', justifyContent: 'space-between', height: '40vh', flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{marginLeft: '4vw', marginBottom: 0}}>Camp Fire</Text>
              <Text customCss={bodyTextStyle2} style={{marginLeft: '4vw', width: '24vw', lineHeight: 1.8}}>Stare into flames, fully appreciating the nature around us.</Text>
            </ScrollAnimation>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '40vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '4vh', top: undefined, bottom: 0}}/>
            <TopGradientBox customStyle={{height: '36vh', width: '4vh', top: undefined, right: '30vh', background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>


          </Box>









          <Box style={{height: '70vh',position: 'relative', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '6vh', top: 0, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))'}} />
            <ScrollAnimation startOffsetPoint={1600}>
              <Text customCss={headerTextStyle} style={{marginLeft: '4vw'}}>PuraStay</Text>
              <Text customCss={bodyTextStyle1} style={{marginLeft: '4vw', marginTop: '2vh', width: '54vw', lineHeight: 1.8}}>Step into our cozy bungalows surrounded by nature and positive aura.</Text>
            </ScrollAnimation>
            <img src={upstairs} style={{height: '70vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '70vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '6vh', top: undefined, bottom: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

          </Box>
          <Box style={{display: 'flex',position: 'relative', height: '48vh', width: '100%'}}>
            <BottomGradientBox customStyle={{height: '4vh', top: 0}}/>

            <ScrollAnimation direction={'-'} startOffsetPoint={800} notAnimated={true} customStyle={{alignItems: 'flex-end',boxSizing: 'border-box', paddingBottom: '3vh', display: 'flex', justifyContent: 'space-between', height: '48vh', flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{marginRight: '4vw', marginBottom: 0, textAlign: 'left', width: '24vw'}}>Full access</Text>
              <Text customCss={bodyTextStyle2} style={{marginRight: '4vw', width: '24vw', textAlign: 'left', lineHeight: 1.8}}>Enjoy full access to PuraSauna during the public schedule.</Text>
            </ScrollAnimation>
            <img src={sofas2} style={{height: '48vh', width: '34vh', position: 'absolute', left: 0, zIndex: 1}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.44, width: '100%', height: '48vh', alignItems: 'center'}}></Box>
            <TopGradientBox customStyle={{height: '4vh', top: undefined, bottom: 0}}/>
            <TopGradientBox customStyle={{height: '48vh', width: '4vh', top: undefined, left: '30vh', background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'}}/>

          </Box>
          <Footer />

        </Box>
    )
}

export default Services