/** @jsxImportSource @emotion/react */
import 'react-datepicker/dist/react-datepicker.css';

import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';


////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import { enterOutline, chevronBack, add } from 'ionicons/icons';

////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import Button from '../components/Button';
import StripePaymentModalWrapper from '../components/PaymentModal';


import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';





///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';

const room = 'room.jpeg'
const insideRoom = 'fake_inside_room.webp'
const bathroom = 'fake_bathroom.webp'
const kitchen = 'fakeKitchen.webp'
const innerKitchen = 'fakeKitchen.webp'
const sofas = 'sofas3.jpeg'
const sofas2 = 'sofas4.jpeg'


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
  margin-right: 4vw;

  `;

const extraSmallTextStyle = css`
  color: white;
  font-size: 12px;
  `;

  const pulseStyle = css`
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  background-color: #3498db;
  position: relative;
  animation: pulse 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 #7D1D9B;
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 8px #7D1D9B;
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 #7D1D9B;
    }
  }
`;

  const selectStyle: React.CSSProperties = {
    padding: '10px 20px', // Similar padding to buttons
    fontSize: '14px', // Same font size as your button
    color: 'white', // Text color to white
    background: 'linear-gradient(to right, #5A0C9D, #9F2D99)', // Gradient background like the button
    borderRadius: '30px', // Rounded corners
    border: 'none', // No border (as in button)
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow like the button
    width: '46vw', // Same width as before
    height: '5vh', // Height to match the button
    WebkitAppearance: 'none', // Remove default styling on iOS
    MozAppearance: 'none', // Remove default styling on Firefox
    appearance: 'none', // Remove default styling on other browsers
    cursor: 'pointer', // Pointer cursor for interactivity
    transition: 'all 0.3s ease', // Smooth transition on hover
  };

const Rooms: React.FC = () => {
  const navigate = useNavigate(); 
  const userLanguage = navigator.language;


  const [sectionVisible, setSectionVisible] = useState(room)

  const [bookNow, setBookNow] = useState(false)


  const [rooms, setRooms] = useState('1')
  const [addOns, setAddOns] = useState<string[]>([]);

  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)

  const [paymentModal, setPaymentModal] = useState(false)

  const basePrice = 500
  const [price, setPrice] = useState(0)
  const [addOnPrice, setAddOnPrice] = useState(0)

  const calculateDaysBetween = (start: Date, end: Date) => {
    const timeDifference = Math.abs(end.getTime() - start.getTime()); // Get the difference in milliseconds
    const dayDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    if (dayDifference === 0) {return 1}
    return dayDifference;
  };

  const phoneNumber = '6287885191204';  // The phone number in international format (no plus sign)
  const message = 'Hello, I need assistance';  // The pre-filled message

  // URL encode the message to ensure it works in the query string
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  useEffect(() => {
    if (!checkInDate || !checkOutDate) {return}

    const nights = calculateDaysBetween(checkInDate, checkOutDate)

    let localAddOnPrice = 0
    if (addOns.includes('Weekly Massage')) {
        localAddOnPrice += 120 * (Math.ceil(nights / 7))
    }
    if (addOns.includes('Daily Room Cleaning')) {
        localAddOnPrice += 50 * nights
    }
    if (addOns.includes('Breakfast')) {
        localAddOnPrice += 100 * nights
    }
    if (addOns.includes('Motorbike Rental')) {
        localAddOnPrice += 100 * nights
    }

    const finalPrice = ((basePrice * nights) + localAddOnPrice) * Number(rooms)

    setPrice(finalPrice)
  }, [checkInDate, checkOutDate, rooms, addOns])





  const toggleSectionVisibility = (section: string) => {
    setSectionVisible(section)
  }

  const handleRoomsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRooms(event.target.value);
  };

  const handleAddOnsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setAddOns(selectedOptions);
  };



  const isDisabledDate = (date: Date) => {
    const disabledDates = ['2025-01-01', '2024-12-15', '2024-02-14'];
  
    // Format date to 'YYYY-MM-DD' in local time zone
    const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' gives 'YYYY-MM-DD' format
  
    return disabledDates.includes(formattedDate);
  };
  






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
          }}
        >
            <img src={require(`../assets/images/irlImages/${sectionVisible}`)} style={{height: '80vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: bookNow ? 0.5 : 0.3, width: '100%', height: '80vh', alignItems: 'center'}}></Box>
            {!bookNow && <Button text={userLanguage.slice(0,2) === 'en' ? 'Book now' : 'Забронировать'} onClick={() => { setBookNow(true); toggleSectionVisibility(room); }} customCss={css`width: 52vw; height: 5vh; position: absolute; z-index: 4; bottom: 0vh; margin: 0; right: -6vw`}></Button>}

            <Modal open={((sectionVisible === room) && (!bookNow))} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                  <button css={pulseStyle} onClick={() => toggleSectionVisibility(kitchen)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '20vw', bottom: '30vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw',}} />
                  </button>

                <button css={pulseStyle} onClick={() => toggleSectionVisibility(insideRoom)} style={{ border: 'none', margin: 0, padding: 0,  position: 'absolute',zIndex: 9, right: '38vw', bottom: '26vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw', }} />
                </button> 

                <button css={pulseStyle} onClick={() => toggleSectionVisibility(sofas)} style={{ border: 'none', margin: 0, padding: 0,  position: 'absolute',zIndex: 9, right: '4vw', bottom: '20vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw',}} />
                </button>              
              </Box>
            </Modal>
            <Modal open={bookNow} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingTop: '18vh', flex: 1 }}>
                  <button  onClick={() => setBookNow(false)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                  </button>
                  <Box>
                    <Box style={{display: 'flex', marginBottom: '3vh', flexDirection: 'row', alignItems: 'center'}}>
                        <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Rooms:' : 'Номера:'}</Text>
                        <select
                            value={rooms}
                            onChange={handleRoomsChange}
                            style={selectStyle}
                            >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </Box>
                    <Box style={{display: 'flex', marginBottom: '3vh', flexDirection: 'row', alignItems: 'center'}}>
                        <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Add ons: ' : 'Доп услуги:'}</Text>
                        <select
                            multiple
                            value={addOns}
                            onChange={handleAddOnsChange}
                            style={selectStyle}
                            >
                            <option value="Weekly Massage">{userLanguage.slice(0,2) === 'en' ? 'Weekly Massage (120k per week)' : "Еж. массаж (120k в неделю)"}</option>
                            <option value="Daily Room Cleaning">{userLanguage.slice(0,2) === 'en' ? 'Daily Room Cleaning (50k per day)' : 'Ежд. уборка (50k в день)'}</option>
                            <option value="Breakfast">{userLanguage.slice(0,2) === 'en' ? 'Breakfast (100k per day)' : 'Завтрак (100k в день)'}</option>
                            <option value="Motorbike Rental">{userLanguage.slice(0,2) === 'en' ? 'Motorbike Rental (100k per day)' : 'Аренда мотоцикла (100k в день)'}</option>
                        </select>
                    </Box>   
                    <Box style={{display: 'flex', marginBottom: '3vh',position: 'relative', zIndex: 6, flexDirection: 'row', alignItems: 'center'}}>
                        <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Check in: ' : 'Регистрация:'}</Text>
                        <DatePicker
                          minDate={new Date()}
                          maxDate={checkOutDate}
                          customInput={<input inputMode='none' />}
                          css={{...selectStyle, paddingRight: 0, paddingTop: 0, paddingBottom: 0}}
                          selected={checkInDate}
                          onChange={(date) => {if (date) { setCheckInDate(date) }}}
                          filterDate={(date) => !isDisabledDate(date)} // Disable specific dates
  
                        />
                    </Box>  
      
                    <Box style={{display: 'flex', position: 'relative', zIndex: 5, marginBottom: '3vh', flexDirection: 'row', alignItems: 'center'}}>
                        <Text customCss={bodyTextStyle}>{userLanguage.slice(0,2) === 'en' ? 'Check out:' : 'Оформить заказ:'}</Text>
                        <DatePicker
                          minDate={checkInDate || new Date()}
                          customInput={<input inputMode='none' />}
                          css={{...selectStyle, paddingRight: 0, paddingTop: 0, paddingBottom: 0}}
                          selected={checkOutDate}
                          onChange={(date) => { if (date) { setCheckOutDate(date) }}}
                          filterDate={(date) => !isDisabledDate(date)} // Disable specific dates
  
                        />
                    </Box>
                  </Box>
                  <Box style={{ width: '100%', display: 'flex', position: 'relative', zIndex: 4, flexDirection: 'column', marginTop: isLargeScreen ? '22vh' : '18vh', justifyContent: 'center', alignItems: 'center'}}>
                    <Text customCss={headerTextStyle} style={{marginBottom: '1vh'}}>{userLanguage.slice(0,2) === 'en' ? `Total: ${price}k IDR` : `Итого: ${price}k IDR`}</Text>
                    <Button text={userLanguage.slice(0,2) === 'en' ? 'Proceed' : 'Продолжить'} customCss={css` height: 6.4vh; margin-top: 0px;`} onClick={() => setPaymentModal(true)} />
                  </Box>
              </Box>
            </Modal>



            <Modal open={sectionVisible === sofas} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                <button css={pulseStyle} onClick={() => toggleSectionVisibility(sofas2)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '8vw', bottom: '16vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={enterOutline} style={{color: 'white', transform: 'rotate(180deg)', height: '4vw', width: '4vw',}} />
                  </button>
                  <button onClick={() => toggleSectionVisibility(room)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                  </button>            
              </Box>
            </Modal>
            <Modal open={sectionVisible === sofas2} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>

                  <button onClick={() => toggleSectionVisibility(sofas)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                  </button>            
              </Box>
            </Modal>



            <Modal open={sectionVisible === insideRoom} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                <button css={pulseStyle} onClick={() => toggleSectionVisibility(bathroom)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '22vw', bottom: '34vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw', transform: 'rotate(270deg)'}} />
                  </button>
                  <button onClick={() => toggleSectionVisibility(room)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                  </button>            
              </Box>
            </Modal>
            <Modal open={sectionVisible === bathroom} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                  <button onClick={() => toggleSectionVisibility(insideRoom)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                    <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                  </button>             
              </Box>
            </Modal>





            <Modal open={sectionVisible === kitchen} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                <button css={pulseStyle} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '10vw', bottom: '30vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw', transform: 'rotate(180deg)'}} />
                </button>
                <button onClick={() => toggleSectionVisibility(room)} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '2vw', top: '12vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={chevronBack} style={{color: 'white', height: '10vw', width: '10vw', marginRight: 10}} />
                </button>

            
              </Box>
            </Modal>
            <Modal open={false} slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } }}} style={{ outline: 'none', position: 'absolute',zIndex: 3, backgroundColor: 'transparent', flex: 1 }}>
              <Box style={{ outline: 'none', position: 'absolute', backgroundColor: 'transparent', height: '100vh', width: '100vw', flex: 1 }}>
                <button css={pulseStyle} style={{ border: 'none', margin: 0, padding: 0, position: 'absolute',zIndex: 9, left: '20vw', bottom: '30vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw'}} />
                </button>

                <button css={pulseStyle} style={{ border: 'none', margin: 0, padding: 0,  position: 'absolute',zIndex: 9, right: '38vw', bottom: '26vh', borderColor: 'transparent', backgroundColor: 'transparent'}}>
                  <IonIcon icon={enterOutline} style={{color: 'white', height: '4vw', width: '4vw'}} />
                </button>              
              </Box>
            </Modal>
            <StripePaymentModalWrapper whatsAppLink={whatsappLink} isVisible={paymentModal} onClose={(paid) => { setPaymentModal(false); if (paid) {navigate('/successPuraStay')}}} />

        </Box>
    )
}

export default Rooms