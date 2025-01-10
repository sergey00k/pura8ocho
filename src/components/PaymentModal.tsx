/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import { useStripe as useStripeJS, Elements, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { db } from '../secrets/firebaseConfig';
import { doc, setDoc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"; 

import { Modal, Box, Slide } from '@mui/material';
import Text from './Text';
import Button from './Button';
import CircularProgress from "@mui/material/CircularProgress";




interface PaymentModalProps {
  isVisible: boolean;
  onClose: (paid?: any) => void;
  whatsAppLink: string;
}

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let headerFontSize = '16';
let bodyFontSize = '16';

if (screenHeight > 738) {
  headerFontSize = '20'
  bodyFontSize = '20'
}

const bodyTextStyle = css`
  color: white;
  font-size: ${bodyFontSize}px;
  `;

const headerTextStyle = css`
  color: white;
  font-size: ${headerFontSize}px;
  font-weight: bold;
  `;

const stripePromise = loadStripe('pk_test_51PVQObAxfjIWgFbrSwnC54rN9jy1J7nnjT8R2dLt4OKpjRVemzRNCtFupPcxhWUkw9uNHf3zcnkpIf3Z3RQswoB100F74OiGHP');

const PaymentModal: React.FC<PaymentModalProps> = ({ isVisible, onClose, whatsAppLink }) => {
  const stripe = useStripeJS();
  const elements = useElements();
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [email, setEmail] = useState("")
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const [password, setPassword] = useState("")


  const [showSpinner, setShowSpinner] = useState(false);


  const [emailExistsError, setEmailExistsError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false)

  useEffect(() => {
    if (chosenPaymentMethod.length > 1) {
      setChosenPaymentMethod("")
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && stripe) {
      createPaymentIntent();
    }
  }, [isVisible, stripe]);


  const createPaymentIntent = async () => {
    try {
      const response = await fetch('https://us-central1-relationshippulse-427504.cloudfunctions.net/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 60, // Example amount: 330 cents ($3.30)
          currency: 'usd',
        }),
      });

      const data = await response.json();

      if (data.error) {
        return
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
        console.error('error with payment')
        }
  };

  const handleStripePayment = async () => {
    setPaymentError(false)
    if (!chosenPaymentMethod) {
      setChosenPaymentMethod("stripe");
      return;
    }
    if (!stripe || !elements) {
      console.error('Stripe is not loaded');
      return;
    }

    if (!clientSecret) {
      await createPaymentIntent();

      if (!clientSecret) {
        console.error('Payment Intent is not created');
        return;
      }
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.error('Stripe elements are not loaded properly');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (result.error) {
      console.error('Payment failed', result.error.message!);
      setPaymentError(true)
    } else if (result.paymentIntent?.status === 'succeeded') {
      await updateDoc(doc(db, 'emailList', email), {
        paid: true
      });
      
      onClose(true); // Close the modal on success

      
    }
  };

  const userEnteredEmail = async (email: string, password: string) => {
    setShowSpinner(true)
    const lowerCaseEmail = email.toLowerCase()
    setEmail(lowerCaseEmail)







    
    try {
      if (lowerCaseEmail.includes('@')) {
        await setDoc(doc(db, 'emailList', lowerCaseEmail), {
          email: lowerCaseEmail,
        });

        window.location.href = whatsAppLink;
      }
      
    } catch (error) {
      console.error("Error updating document: ", error);
      setShowSpinner(false)

    }
    if (!lowerCaseEmail.includes('@')) {
      setEmailNotValid(true)
      setShowSpinner(false)
    }
  }



  

  

  return (
    <Modal open={isVisible} onClose={() => onClose()} style={{height: '80vh', alignItems: 'center',  display: 'flex', justifyContent: 'center', width: '100vw'}}>
            <Slide direction="up" style={{ outline: 'none' }} in={isVisible} mountOnEnter unmountOnExit>

      <Box style={{...styles.modalContent, height: !emailConfirmed ? '30vh' : '40vh'}}>
        {(!emailConfirmed || (!email.includes('@'))) ? ( 
          <Box style={{width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text customCss={headerTextStyle} style={{...styles.modalTitle, marginBottom: emailExistsError ? 6 : undefined}}>Enter your email</Text>
            {emailNotValid && (<Text style={{color: 'red', textAlign: 'center', fontSize: 12, marginBottom: 4}}>Please enter a valid email.</Text>)}
            <Box style={{...styles.inputGradient, marginTop: 12}}>
                <input style={{...styles.input, fontSize: 16, paddingTop: 6, paddingBottom: 6}} placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) } } />
            </Box>
            {showSpinner ? <CircularProgress /> : <Button text={'CONFIRM'} customCss={{ height: 40, width: '64%', marginTop: 15}} onClick={() => userEnteredEmail(email, password)} />}

        </Box>) : (
        <>
          {true ? (
            <>
            <Text customCss={headerTextStyle} style={styles.modalTitle}>Enter your card details</Text>
            {paymentError && (<Text style={{color: 'red', fontFamily: 'Montserrat-Regular', fontSize: 12, marginBottom: 12}}>There was an error with the payment</Text>)}
            </>
          ) : (
            <Text customCss={headerTextStyle} style={styles.modalTitle}>Choose a Payment Method</Text>
          )}
          {(true && (email.includes('@'))) ? (
            <>
              {true && (
                <>
                <Box style={styles.cardContainer}>
                  <Box style={{ paddingBottom: '1%', marginBottom: '4vh', background: 'linear-gradient(to right, #5A0C9D, #9F2D99)', }}>
                    <CardNumberElement
                      options={{
                        style: {
                          base: {
                            fontSize: '18px',
                            color: '#424770',
                            backgroundColor: 'black',
                            letterSpacing: '0.025em',
                            fontFamily: 'Montserrat, sans-serif',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box style={styles.expiryCvcContainer}>
                    <Box style={styles.expiryContainer}>
                      <CardExpiryElement
                        options={{
                          style: {
                            base: {
                              fontSize: '18px',
                              color: '#424770',
                              letterSpacing: '0.025em',
                              fontFamily: 'Montserrat, sans-serif',
                              backgroundColor: 'black',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box style={styles.cvcContainer}>
                      <CardCvcElement
                        options={{
                          style: {
                            base: {
                              fontSize: '18px',
                              textAlign: 'flex-end',
                              color: '#424770',
                              letterSpacing: '0.025em',
                              fontFamily: 'Montserrat, sans-serif',
                              backgroundColor: 'black',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                                  <Box style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                  <Button text={'BOOK NOW'} customCss={{ height: 40, width: '50vw', marginTop: 30}} onClick={handleStripePayment}/>
                                </Box>
                </>
              )}

            </>
          ) : (
            <>
              <Button text={'CREDIT/DEBIT CARD'} onClick={handleStripePayment} />
            </>
          )}
          </>
        )}
      </Box>
      </Slide>
    </Modal>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    modalContent: {
      backgroundColor: 'black',
      padding: '10px 10px 10px', // Combines vertical and horizontal padding
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40vh', // Ensure height is in pixels
      width: '84vw'
    },
    modalTitle: {
      textAlign: 'center' as React.CSSProperties['textAlign'],
      marginBottom: '20px',
      width: '64vw',

    },
    startTestButton: {
      backgroundColor: '#874E4C',
      width: '200px',
      height: '58px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none', // Optional: Reset default button styles
      cursor: 'pointer',
      borderRadius: '5px',
    },
    buttonText: {
      color: 'white',
      fontSize: '14px',
      fontFamily: 'Montserrat, sans-serif',
    },
    cardContainer: {    
      width: '64%',
      
    },
    expiryCvcContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '26px',
    },
    expiryContainer: {
      flex: 1,
      marginRight: '10px',
      paddingBottom: '1%',
      background: 'linear-gradient(to right, #5A0C9D, #9F2D99)',
    },
    cvcContainer: {
      flex: 1,
      width: '25%',
      paddingBottom: '1%',
      background: 'linear-gradient(to right, #5A0C9D, #9F2D99)',
    },
    input: {
      width: '90%',
      height: '4vh',
      border: '1px solid transparent',
      padding: '0 10px',
      borderRadius: '24px',
    },
    inputGradient: {
        background: 'linear-gradient(to right, #5A0C9D, #9F2D99)',
        padding: '1%',
        width: '100%',
        borderRadius: '24px',
        marginBottom: '10px',
    }
  };
  

const StripePaymentModalWrapper: React.FC<PaymentModalProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentModal {...props} />
  </Elements>
);

export default StripePaymentModalWrapper;