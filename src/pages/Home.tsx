/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

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
import leafBrooms from '../assets/images/backgrounds/leafBrooms.jpeg'


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
import ScheduleModal from '../components/ScheduleModal';
import ScrollAnimationHome from '../components/PresetSlideAnimation';


///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, getDoc, where } from "firebase/firestore"; 

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
  height: ${screenHeight * 0.9}px;
  object-fit: cover;
  position: absolute;
  z-index: 1;
  width: 180%;
  top: -12vh;
  left: -40vw;
`;

// w : 190% h : ${screenHeight}px top: -140px; left : -140px
//  animation: ${rotate} 60s linear infinite;

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
  const userLanguage = navigator.language;

  const [scheduleModalOn, setScheduleModalOn] = useState(false)
  const [displayedSchedule, setDisplayedSchedule] = useState<any>(null)

  const [publicSchedule, setPublicSchedule] = useState<any>(null)
  const [privateSchedule, setPrivateSchedule] = useState<any>(null)
  const [womensOnlySchedule, setWomensOnlySchedule] = useState<any>(null)

  
  useEffect(() => {
    const asyncFunc = async (docName: string, type: string) => {
      try {
        const schedulesListRef = doc(db, 'schedulesList', docName);
        const docSnapshot = await getDoc(schedulesListRef);
    
        if (docSnapshot.exists()) {
          const schedules = docSnapshot.data();
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // FRONTEND EXPECTS ALL OF THESE DAYS TO BE PRESENT IN DATABASE
    
          const publicSchedules = days
            .map((day, index) => {
              const times = schedules[day.toLowerCase()];
    
              // Ensure `times` is an array and has values
              if (Array.isArray(times)) {
                if (times.length === 0) {
                  return null; // Return null if there are no times
                }
    
                return {
                  id: index,
                  time: times.join(' - '), // Combine times into a single string
                  day,
                  type, // The provided type
                };
              } else {
                console.warn(`Skipping ${day} because it's not an array or is undefined.`);
                return null; // Return null if times is not an array or undefined
              }
            })
            .filter(item => item !== null); // Filter out any null values
    
          // Assign schedules to the corresponding state
          if (docName === 'Public') {
            setPublicSchedule(publicSchedules);
          } else if (docName === 'Private') {
            setPrivateSchedule(publicSchedules);
          } else {
            setWomensOnlySchedule(publicSchedules);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    

    asyncFunc('Public', 'Public');
    asyncFunc('Private', 'Private');
    asyncFunc('WomensOnly', 'Womens Only');


  }, [db]);


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
          <Text customCss={[headerTextStyle, css`  opacity: 0;  animation: ${fadeInHeader} 3s forwards;`]} style={{position: 'absolute', bottom: '1%', left: '48%', textAlign: 'right', width: '46%', zIndex: 4,}}>{userLanguage.slice(0,2) === 'en' ? 'Peace, Relaxation, Community.' : 'Мир, расслабление, общность.'}</Text>
        </Box>

        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', height: 520, alignItems: 'flex-end'}}>
          <img src={statuePeople} style={{height: 520,objectFit: 'cover',  transform: 'scaleX(-1)', position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.3, width: '100%', height: 520, alignItems: 'center'}}></Box>

          <Box style={{ zIndex: 3, width: '100%' }}>
            <Text customCss={[headerTextStyle, css`  opacity: 0;  animation: ${fadeInHeader} 3s forwards;`]} style={{  zIndex: 3,marginLeft: 32,  marginTop: 32}}>{userLanguage.slice(0,2) === 'en' ? 'At Pura8ocho...' : 'В Pura8ocho...'}</Text>
            <Text customCss={fadeInStyle} style={{  zIndex: 3, marginLeft: 32, opacity: 0.8, marginTop: 32}}>{userLanguage.slice(0,2) === 'en' ? <>You'll find a hot natural sauna,<br />a flower filled ice bath,<br />a warm healthy environment<br /> and a community like no other.<br /><br />Here we all share the<br /> same goal of relaxing,<br /> reenergizing, connecting.</> : <>Вы найдете горячую<br /> натуральную сауну,<br /> ледяную ванну,<br /> наполненную цветами,<br /> здоровую и<br /> теплую атмосферу и<br /> сообщество, не<br /> похожее на другие.<br /><br />Здесь мы все<br /> разделяем одну<br /> цель — расслабляться,<br />восстанавливаться и<br /> соединяться.</>}</Text>
          </Box>
          <Box style={{display: 'flex', marginRight: 32, zIndex: 4, flexDirection: 'column',}}>
            <Button customCss={css`margin-top: 0px; margin-bottom: 0px;`} onClick={() => navigate('/services')} text={userLanguage.slice(0,2) === 'en' ? 'See our services' : 'Посмотрите наши услуги'} />
            <Button onClick={() => navigate('/allBookings')} text={userLanguage.slice(0,2) === 'en' ?  'Make a booking' : 'Сделать бронирование'} />
          </Box>
          <TopGradientBox customStyle={{top: undefined, bottom: 0, height: 26, width: '100%'}} />

        </Box>
        
        <Box style={{backgroundColor: 'black', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '36vh'}}>
          <ScrollAnimationHome directionXY={'X'} startOffsetPoint={400} notAnimated={false} customStyle={{ marginLeft: 32, boxSizing: 'border-box',display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
            <Text customCss={headerTextStyle} style={{ width: '100%', position: 'relative', zIndex: 5, marginTop: 20}}>{userLanguage.slice(0,2) === 'en' ? "Check out the atmosphere..." : "Оцените атмосферу..." }</Text>
          </ScrollAnimationHome>

          <Box style={{display: 'flex',  flexDirection: 'row', position: 'relative', width: '100%'}}>
            <VideoPlayer videoPath={require('../assets/videos/video-one.mp4')} thumbnailPath={thumbnail1}/>
            <VideoPlayer videoPath={require('../assets/videos/video2.mp4')} thumbnailPath={thumbnail2}/>
            <VideoPlayer videoPath={require('../assets/videos/video3.mp4')} thumbnailPath={thumbnail3}/>
          </Box>
        </Box>
        <Box style={{backgroundColor: 'black', overflow: 'hidden', position: 'relative', zIndex: 1, paddingTop: screenHeight * 0.04, paddingBottom: screenHeight * 0.04, width: '100%', display: 'flex', flexDirection: 'column', height: screenHeight * 0.52,}}>
            <ScrollAnimationHome directionXY={'Y'} startOffsetPoint={700} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{ marginLeft: 32, marginTop: 0, marginBottom: screenHeight * 0.06,  position: 'relative', zIndex: 4}}>{userLanguage.slice(0,2) === 'en' ? "About Pura8ocho" : "Наша история"}</Text>
            </ScrollAnimationHome>
            <RotatingImage 
        src={starrySky} 
        alt="Starry Sky"
      />
                <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 3, opacity: 0.4, width: '100%', height: screenHeight * 0.8, top: -(screenHeight * 0.05), alignItems: 'center'}}></Box>
          <ScrollAnimationHome directionXY={'Y'} startOffsetPoint={700} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
            <Box style={{ width: '83%',marginLeft: 32, opacity: 0.8,  position: 'relative', zIndex: 4, borderBottomWidth: 1, borderTopWidth: 1, borderTopStyle: 'solid',borderBottomStyle: 'solid', paddingTop: 20, paddingBottom: 20, borderColor: 'white'}}>
              <Text customCss={bodyTextStyle} style={{margin: 0}} >{userLanguage.slice(0,2) === 'en' ? "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum v vLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum" : ""}</Text>
            </Box>
          </ScrollAnimationHome>
        </Box>
        <Box style={{backgroundColor: 'black', width: screenWidth, display: 'flex',overflow: 'hidden', position: 'relative', flexDirection: 'column', height: 230, alignItems: 'center'}}>
          <img src={leafBrooms} style={{width: screenWidth,position: 'absolute', zIndex: 1,  objectFit: 'cover', height: 230}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.4, width: '100%', marginTop: -1, height: 231, alignItems: 'center'}}></Box>
          
          <ScrollAnimationHome directionXY={'Y'} startOffsetPoint={1000} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
            <Text customCss={headerTextStyle} style={{marginTop: 20, marginBottom: 16, zIndex: 3,  'textAlign': 'center',}}>{userLanguage.slice(0,2) === 'en' ? "Sauna schedule" : "Расписание сауны"}</Text>
          </ScrollAnimationHome>
          

          <Box style={{ flexDirection: 'column', alignItems: 'center', width: '90%', zIndex: 4, justifyContent: 'space-between', display: 'flex'}}>
            <ScrollAnimationHome directionXY={'X'} delay={300} startOffsetPoint={1000} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Button customCss={css`height: 36px; width: 180px; margin-top: 0px; margin-bottom: 4px`} onClick={() => {setScheduleModalOn(true); setDisplayedSchedule(publicSchedule) }} text={userLanguage.slice(0,2) === 'en' ? 'Public' : 'Общественная'} />
            </ScrollAnimationHome>


            <ScrollAnimationHome directionXY={'X'} directionLeftRight={'-'} delay={600} startOffsetPoint={1000} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Button customCss={css`height: 36px; width: 180px; margin-bottom: 4px`} onClick={() => {setScheduleModalOn(true); setDisplayedSchedule(womensOnlySchedule) }} text={userLanguage.slice(0,2) === 'en' ? "Women's only" : "для женщин"} />
            </ScrollAnimationHome>

            <ScrollAnimationHome directionXY={'X'} startOffsetPoint={1000} delay={900} notAnimated={false} customStyle={{ boxSizing: 'border-box',  position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Button customCss={css`height: 36px; width: 180px; margin-bottom: 4px`} onClick={() => {setScheduleModalOn(true); setDisplayedSchedule(privateSchedule) }} text={userLanguage.slice(0,2) === 'en' ? 'Private' : 'Частная'} />
            </ScrollAnimationHome>


          </Box>

        </Box>
        <Box style={{backgroundColor: 'black', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 520, position: 'relative', alignItems: 'flex-end'}}>
          <Box style={{ zIndex: 3, width: '100%' }}>
            <ScrollAnimationHome directionXY={'X'} startOffsetPoint={1600} notAnimated={false} customStyle={{  boxSizing: 'border-box',display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Text customCss={headerTextStyle} style={{width: '100%', zIndex: 3, marginLeft: 32, marginTop: 40}}>{userLanguage.slice(0,2) === 'en' ? "Experience it for yourself." : "Испытайте это на себе."}</Text>
            </ScrollAnimationHome>
          </Box>
          <img src={fire} style={{height: 520, objectFit: 'cover', position: 'absolute', zIndex: 1, width: '100%'}}></img>
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.3, width: '100%', height: 520, alignItems: 'center'}}></Box>
          <Box style={{display: 'flex', zIndex: 4,marginRight: 32, flexDirection: 'column',}}>
            <ScrollAnimationHome directionXY={'Y'} startOffsetPoint={1600} delay={300} animationDistance={30} notAnimated={false} customStyle={{  boxSizing: 'border-box',display: 'flex', justifyContent: 'space-between',flexDirection: 'column'}}>
              <Button customCss={css`margin-bottom: 4vh;`} onClick={() => navigate('/sauna')} text={userLanguage.slice(0,2) === 'en' ? 'Book a sauna' : 'Забронировать сауну'} />
            </ScrollAnimationHome>
          </Box>
          <TopGradientBox customStyle={{top: undefined, bottom: 0, height: 26, width: '100%'}} />
        </Box>
        <Box style={{ padding: 16, alignItems: 'center'}}>
          <Footer />
        </Box>

        <ScheduleModal isVisible={scheduleModalOn} onClose={() => setScheduleModalOn(false)} schedules={displayedSchedule} />
      </Box>
    );
  };
  
  export default Home;