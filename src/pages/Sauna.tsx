/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

////////// icons /////////////////
import { IonIcon } from '@ionic/react';
import whatsapp from '../assets/images/socialLogos/whatsapp.png'

//images
import wideshot2 from '../assets/images/ServicesImages/wideshot2.jpeg'


////////// components /////////////////
import Text from '../components/Text'
import Footer from '../components/Footer'
import Button from '../components/Button';
import { TopGradientBox, BottomGradientBox } from '../components/Gradient';
import StripePaymentModalWrapper from '../components/PaymentModal';


///////// firebase database ////////////////
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';

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

  const selectStyle: React.CSSProperties = {
    padding: '10px 20px', // Similar padding to buttons
    fontSize: '14px', // Same font size as your button
    color: 'white', // Text color to white
    background: 'linear-gradient(to right, #5A0C9D, #9F2D99)', // Gradient background like the button
    borderRadius: '30px', // Rounded corners
    border: 'none', // No border (as in button)
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow like the button
    width: '34vw', // Same width as before
    height: '6vh', // Height to match the button
    WebkitAppearance: 'none', // Remove default styling on iOS
    MozAppearance: 'none', // Remove default styling on Firefox
    appearance: 'none', // Remove default styling on other browsers
    cursor: 'pointer', // Pointer cursor for interactivity
    transition: 'all 0.3s ease', // Smooth transition on hover
  };



const Sauna: React.FC = () => {
    const [saunaType, setSaunaType] = useState('Public')

    const [discountCode, setDiscountCode] = useState('')
    const [addOn, setAddOn] = useState('Towel')

    const [saunaSelectedTimes, setSaunaSelectedTimes] = useState(['Tuesday, 18:00 - 22:00', 'Friday, 18:00 - 22:00'])
    const [saunaPublicTimes, setSaunaPublicTimes] = useState(['Tuesday, 18:00 - 22:00', 'Friday, 18:00 - 22:00'])
    const [saunaPrivateTimes, setSaunaPrivateTimes] = useState(['Monday, 10:00 - 15:00', 'Thursday, 10:00 - 15:00'])
    const [saunaWomenOnlyTimes, setSaunaWomenOnlyTimes] = useState(['Wednesday, 18:00 - 22:00',])

    const [saunaSelectedTime, setSaunaSelectedTime] = useState('Tuesday, 18:00 - 22:00')

    const [paymentModal, setPaymentModal] = useState(false)

    const [price, setPrice] = useState(300)

    useEffect(() => {
        if (saunaType === 'Public') {
            setSaunaSelectedTimes(saunaPublicTimes)
            setSaunaSelectedTime(saunaPublicTimes[0])
        } else if (saunaType === 'Private') {
            setSaunaSelectedTimes(saunaPrivateTimes)
            setSaunaSelectedTime(saunaPrivateTimes[0])

        } else {
            setSaunaSelectedTimes(saunaWomenOnlyTimes)
            setSaunaSelectedTime(saunaWomenOnlyTimes[0])
        }
    },[saunaType, saunaPublicTimes, saunaPrivateTimes, saunaWomenOnlyTimes])


    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaunaType(event.target.value);
      };
    
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaunaSelectedTime(event.target.value);
    };

    const handleAddOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAddOn(event.target.value);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountCode(event.target.value);
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
            height: '80vh'
            }}
        >
            <BottomGradientBox customStyle={{height: '9vh', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))'}} />
            <Box style={{width: '90%', position: 'relative', marginTop: '4vh', zIndex: 4,}}>
                <Box style={{display: 'flex', width: '100%', marginBottom: '6vh', justifyContent: 'space-between'}}>
                    <Box>
                        <Text customCss={bodyTextStyle}>Sauna Type: </Text>
                        <select
                            value={saunaType}
                            onChange={handleTypeChange}
                            style={selectStyle}
                            >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Women-Only">Women-Only</option>
                        </select>
                    </Box>
                    <Box>
                        <Text customCss={bodyTextStyle}>Time: </Text>
                        <select
                            value={saunaSelectedTime}
                            onChange={handleTimeChange}
                            style={{ ...selectStyle, width: '50.5vw' }}
                            >

                                {saunaSelectedTimes.map((type, index) => (
                                    <option key={index} value={type}>
                                    {type}
                                    </option>
                                ))}
                        </select>
                    </Box>
                </Box>
                <Box style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                    <Box>
                        <Text customCss={bodyTextStyle}>Add on: </Text>
                        <select
                            value={addOn}
                            onChange={handleAddOnChange}
                            style={selectStyle}
                            >
                            <option value="Towel">Towel</option>
                            <option value="Sarung">Sarung</option>
                            <option value="Massage">Massage</option>
                            <option value="Private">VIP SUPER SUPER PREMIUM</option>
                        </select>
                    </Box>
                    <Box>
                        <Text customCss={bodyTextStyle}>Discount Code: </Text>
                        <input
                            type="text"
                            value={discountCode}
                            onChange={handleCodeChange}
                            list="time-options" // This will show the available options when the user types
                            style={{...selectStyle, height: '3.2vh', width: '40vw'}} // Apply the same styles
                            />
                    </Box>
                </Box>
            </Box>
            <Box style={{ width: '100%', display: 'flex', position: 'relative', zIndex: 4, flexDirection: 'column', marginBottom: '2vh', justifyContent: 'center', alignItems: 'center'}}>
                <Text customCss={headerTextStyle}>{`Total: ${price}k IDR`}</Text>
                <Button text={'Pay now'} customCss={css` height: 6.4vh; margin-top: 0px;`} onClick={() => setPaymentModal(true)} />
            </Box>
            <img src={wideshot2} style={{height: '80vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.5, width: '100%', height: '80vh', alignItems: 'center'}}></Box>

            <StripePaymentModalWrapper isVisible={paymentModal} onClose={() => setPaymentModal(false)} />
        </Box>
    )
}

export default Sauna