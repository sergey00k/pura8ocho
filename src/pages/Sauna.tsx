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
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';




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
    width: '24vw', // Same width as before
    height: '6vh', // Height to match the button
    WebkitAppearance: 'none', // Remove default styling on iOS
    MozAppearance: 'none', // Remove default styling on Firefox
    appearance: 'none', // Remove default styling on other browsers
    cursor: 'pointer', // Pointer cursor for interactivity
    transition: 'all 0.3s ease', // Smooth transition on hover
  };



const Sauna: React.FC = () => {
    const navigate = useNavigate(); 

    const [saunaType, setSaunaType] = useState('Public')

    const [discountCode, setDiscountCode] = useState('')
    const [addOn, setAddOn] = useState([''])
    const [addOnPrice, setAddOnPrice] = useState(0)


    const [tickets, setTickets] = useState('1')
    const [dateSelected, setDateSelected] = useState<any>(undefined)


    const [saunaSelectedTimes, setSaunaSelectedTimes] = useState(['18:00 - 22:00', '18:00 - 22:00'])
    const [saunaPublicTimes, setSaunaPublicTimes] = useState(['18:00 - 22:00', '18:00 - 22:00'])
    const [saunaPrivateTimes, setSaunaPrivateTimes] = useState(['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'])
    const [saunaWomenOnlyTimes, setSaunaWomenOnlyTimes] = useState(['18:00 - 22:00',])

    const [saunaSelectedTime, setSaunaSelectedTime] = useState('18:00 - 22:00')
    const [massageSelectedTime, setMassageSelectedTime] = useState('18:00')
    const massageSelectedTimes = ['18:00', '19:00', '20:00', '21:00']


    const [paymentModal, setPaymentModal] = useState(false)

    const basePrice = 300
    const baseWomensPrice = 450

    const basePrivatePrice = 3000
    const [price, setPrice] = useState(basePrice)

    /////// private 
    const [privateSelectedDuration, setPrivateSelectedDuration] = useState('2')
    const steamMasterBasePrice = 2500
    const [steamMasterPrice, setSteamMasterPrice] = useState('2500')
    const [availableDuration, setAvailableDuration] = useState(['2', '3', '4', '5', '6', '7', '8', '9'])

    const phoneNumber = '6287885191204';  // The phone number in international format (no plus sign)
    const message = `Hello,\n I would like to book a ${saunaType} sauna at ${saunaSelectedTime} ${saunaType === 'Private' ? `for ${privateSelectedDuration} hours` : ''} on ${dateSelected && dateSelected.toLocaleDateString('en-CA')} for ${tickets} guests with the following add ons :\n\n ${addOn.map((item) => { if (item === 'massage') { return `${item} at ${massageSelectedTime}\n` } else { return `${item}\n` } }).join('')}\n Total price: ${price}k`;  // The pre-filled message

    // URL encode the message to ensure it works in the query string
    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


    

    useEffect(() => {
        let localAddOnPrice = 0
        if (addOn.includes('towel')) {
            localAddOnPrice += 20
        }
        if (addOn.includes('massage')) {
            localAddOnPrice += 250
        }
        if (addOn.includes('1NightStay')) {
            localAddOnPrice += 500
        }
        if (addOn.includes('bonfire')) {
            localAddOnPrice += 100
        }
        if (addOn.includes('eucalyptus')) {
            localAddOnPrice += 200
        }
        if (addOn.includes('ice')) {
            localAddOnPrice += 400
        }
        if (addOn.includes('flowers')) {
            localAddOnPrice += 200
        }
        if (addOn.includes('teaCeremony')) {
            localAddOnPrice += 1500
        }
        setAddOnPrice(localAddOnPrice)
    },[addOn])

    useEffect(() => {
        if (saunaType === 'Private') {
            setAddOn([''])
        }
    },[saunaType])


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

        if (saunaType === 'Private') {
            if (Number(tickets) < 5) {
                setTickets('10')
            }
            const steamMasterNewPriceAdded = (Number(tickets) - 10) * 200
            setSteamMasterPrice(String(steamMasterBasePrice + steamMasterNewPriceAdded))
            const peopleAdded = (Number(tickets) - 10) * 300
            const hoursAdded = (Number(privateSelectedDuration) - 2) * 700
            setPrice((basePrivatePrice + addOnPrice) + peopleAdded + hoursAdded + (addOn.includes('steamMaster') ? Number(steamMasterPrice) + steamMasterNewPriceAdded : 0))
        } else if (saunaType === 'Public') {
            setPrice((basePrice + addOnPrice) * Number(tickets))
        } else {
            setPrice((baseWomensPrice + addOnPrice) * Number(tickets))
        }
    },[saunaType, saunaPublicTimes, saunaPrivateTimes, saunaWomenOnlyTimes, tickets,addOnPrice, addOn, privateSelectedDuration])

    useEffect(() => {
        if (saunaSelectedTime === '13:00') {
            setAvailableDuration(prev => prev.slice(0,7))
        }  else if (saunaSelectedTime === '14:00') {
            setAvailableDuration(prev => prev.slice(0,6))
        }  else if (saunaSelectedTime === '15:00') {
            setAvailableDuration(prev => prev.slice(0,5))
        }  else if (saunaSelectedTime === '16:00') {
            setAvailableDuration(prev => prev.slice(0,4))
        }  else if (saunaSelectedTime === '17:00') {
            setAvailableDuration(prev => prev.slice(0,3))
        }  else if (saunaSelectedTime === '18:00') {
            setAvailableDuration(prev => prev.slice(0,2))
        }  else if (saunaSelectedTime === '19:00') {
            setAvailableDuration(prev => prev.slice(0,1))
        } 
    },[saunaSelectedTime])


    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaunaType(event.target.value);
      };
    
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaunaSelectedTime(event.target.value);
    };

    const handleMassageTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMassageSelectedTime(event.target.value);
    };

    const handleAddOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setAddOn(selectedOptions);
      };
      

    const handleTicketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTickets(event.target.value);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountCode(event.target.value);
    };

    const handlePrivateDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPrivateSelectedDuration(event.target.value);
    };

    const isDisabledDate = (date: Date) => {
        const disabledDates = [''];
      
        // Format date to 'YYYY-MM-DD' in local time zone
        const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' gives 'YYYY-MM-DD' format
      
        // Disable specific dates from the list and specific days (Sunday, Tuesday, Friday)

        if (saunaType === 'Public') {
            const isDayOfWeek = date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 4 || date.getDay() === 6;  // 0 = Sunday, 2 = Tuesday, 5 = Friday
            return disabledDates.includes(formattedDate) || isDayOfWeek;

        } else if (saunaType === 'Private') {
            const isDayOfWeek = date.getDay() === 0 || date.getDay() === 2 || date.getDay() === 5;  // 0 = Sunday, 2 = Tuesday, 5 = Friday
            return disabledDates.includes(formattedDate) || isDayOfWeek;

        } else {
            const isDayOfWeek = date.getDay() === 0 || date.getDay() === 2 || date.getDay() === 5 || date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 6;  // 0 = Sunday, 2 = Tuesday, 5 = Friday
            return disabledDates.includes(formattedDate) || isDayOfWeek;

        }

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
                <Box style={{display: 'flex', width: '100%', marginBottom: '4vh', justifyContent: 'space-between'}}>
                    <Box>
                        <Text customCss={bodyTextStyle}>Sauna Type: </Text>
                        <select
                            value={saunaType}
                            onChange={handleTypeChange}
                            style={{...selectStyle, width: '56.5vw' }}
                            >
                            <option value="Public">Public (18:00 - 22:00)</option>
                            <option value="Women-Only">Women-Only (17:00 - 21:00)</option>
                            <option value="Private">Private</option>
                        </select>
                    </Box>
                    <Box>
                        <Text customCss={bodyTextStyle}>Guests: </Text>
                        {saunaType === 'Private' 
                        ? 
                            <select
                                value={tickets}
                                onChange={handleTicketChange}
                                style={selectStyle}
                                >
                                <option value="10">10</option>
                                <option value="15">10 - 15</option>
                                <option value="20">15 - 20</option>
                                <option value="25">20 - 25</option>
                                <option value="30">25 - 30</option>
                            </select>
                        :
                            <select
                            value={tickets}
                            onChange={handleTicketChange}
                            style={selectStyle}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        }
                    </Box>

                </Box>
                <Box style={{display: 'flex', width: '100%',  justifyContent: 'space-between'}}>
                    <Box>
                        <Text customCss={bodyTextStyle}>Add on: </Text>
                        {saunaType === 'Private' 
                        ? 
                            (<select
                                multiple
                                value={addOn}
                                onChange={handleAddOnChange}
                                style={{...selectStyle, width: '56.5vw'}}
                                >
                                <option value="bonfire">Bonfire (100k)</option>
                                <option value="eucalyptus">Eucalyptus Brooms (200k)</option>
                                <option value="ice">Ice for bath (400k)</option>
                                <option value="flowers">Flowers for bath (200k)</option>
                                <option value="teaCeremony">Tea Ceremony (1500k)</option>
                                <option value="steamMaster">{`Steam Master (${steamMasterPrice}k)`}</option>

                            </select>)
                        : 
                            (<select
                                multiple
                                value={addOn}
                                onChange={handleAddOnChange}
                                style={{...selectStyle, width: '56.5vw'}}
                                >
                                <option value="towel">Towel (20k)</option>
                                <option value="massage">Massage (250k)</option>
                                <option value="1NightStay">1 Night Stay (500k)</option>
                            </select>)
                        }
                    </Box>
                    <Box>
                        <Text customCss={bodyTextStyle}>Date: </Text>
                        <DatePicker
                          minDate={new Date()}
                          customInput={<input inputMode='none' />}
                          css={{...selectStyle, paddingRight: 0, paddingTop: 0, paddingBottom: 0, }}
                          selected={dateSelected}
                          onChange={(date) => {if (date) { setDateSelected(date) }}}
                          filterDate={(date) => !isDisabledDate(date)} // Disable specific dates
                          popperPlacement={"left-end"} // You can use different placements like "top-start", "bottom", etc.

                        />
                    </Box>
                </Box>
                {addOn.includes('massage') && 
                    <Box style={{display: 'flex', width: '100%',  justifyContent: 'space-between'}}>

                    <Box style={{width: '56.5vw'}}>
                        <Text customCss={bodyTextStyle}>Massage Time: </Text>
                        <select
                            value={massageSelectedTime}
                            onChange={handleMassageTimeChange}
                            style={{ ...selectStyle, width: '100%' }}
                            >

                                {massageSelectedTimes.map((type, index) => (
                                    <option key={index} value={type}>
                                    {type}
                                    </option>
                                ))}
                        </select>
                    </Box>

                    
                </Box>
                }
                {saunaType === 'Private' && (
                <Box style={{display: 'flex', width: '100%',  justifyContent: 'space-between'}}>

                    <Box style={{width: '40%'}}>
                        <Text customCss={bodyTextStyle}>{saunaType === 'Private' ? 'Start Time: ' : 'Time: '}</Text>
                        <select
                            value={saunaSelectedTime}
                            onChange={handleTimeChange}
                            style={{ ...selectStyle, width: '100%' }}
                            >

                                {saunaSelectedTimes.map((type, index) => (
                                    <option key={index} value={type}>
                                    {type}
                                    </option>
                                ))}
                        </select>
                    </Box>
                    
                        <Box style={{width: '57%'}}>
                            <Text customCss={bodyTextStyle}>Duration: </Text>
                            <select
                                value={privateSelectedDuration}
                                onChange={handlePrivateDurationChange}
                                style={{ ...selectStyle, width: '100%' }}
                                >
                                    {availableDuration.map((item) => 
                                        <option value={item}>{item + ' hours'}</option>
                                    )}
  
                            </select>
                        </Box>
                    
                </Box>
                )}
            </Box>
            <Box style={{ width: '100%', display: 'flex', position: 'relative', zIndex: 3, flexDirection: 'column', marginBottom: '2vh', justifyContent: 'center', alignItems: 'center'}}>
                <Text customCss={headerTextStyle}>{`Total: ${price}k IDR`}</Text>
                <Button text={'Proceed'} customCss={css` height: 6.4vh; margin-top: 0px;`} onClick={() => { if (dateSelected) { setPaymentModal(true) } } } />
            </Box>
            <img src={wideshot2} style={{height: '80vh', position: 'absolute', zIndex: 1, width: '100%'}}></img>
            <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 2, opacity: 0.5, width: '100%', height: '80vh', alignItems: 'center'}}></Box>

            <StripePaymentModalWrapper isVisible={paymentModal} onClose={(paid) => { setPaymentModal(false); if (paid) { navigate('/success');}}} whatsAppLink={whatsappLink} />
        </Box>
    )
}

export default Sauna