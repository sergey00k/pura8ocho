/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

interface FireAnimationProps {
  customStyles?: SerializedStyles;
}

const fireAnimationStyles = css`
  /* Keyframes for ember floating, flickering, and fading */
  @keyframes emberFloat {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    30% {
      transform: translate(-10px, -40px) scale(1);
      opacity: 0.9;
    }
    60% {
      transform: translate(20px, -60px) scale(0.8);
      opacity: 0.7;
    }
    100% {
      transform: translate(-15px, -100px) scale(0.5);
      opacity: 0;
    }
  }

  /* Flicker effect for embers */
  @keyframes emberFlicker {
    0% {
      box-shadow: 0 0 6px 5px rgba(255, 69, 0, 0.5);
    }
    50% {
      box-shadow: 0 0 8px 8px rgba(255, 69, 0, 0.5);
    }
    100% {
      box-shadow: 0 0 6px 5px rgba(255, 69, 0, 0.5);
    }
  }

  /* Ember base styles */
  .ember {
    position: absolute;
    bottom: 0;
    width: 4px;
    height: 4px;
    background-color: orange;
    border-radius: 50%;
    animation: emberFloat 6s linear infinite, emberFlicker 1.5s infinite;
    opacity: 0;
  }

  /* Ember container */
  .embers-container:nth-child(1) {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    background-color: transparent;
  }

  .embers-container:nth-child(2) {
    position: relative;
    bottom: 200px;
    width: 200px;
    height: 200px;
    overflow: hidden;
    background-color: transparent;
  }

  .embers-container:nth-child(2) .ember {
    animation-delay: 1.5s; /* Start 1.5 seconds later */
  }

  /* Individual ember variations for more randomness */
  .ember:nth-child(1) {
    left: 10%;
    animation-duration: 4s;
    animation-delay: 0s;
    width: 3px;
    height: 5px;
    background-color: rgba(255, 69, 0, 0.8);
  }

  .ember:nth-child(2) {
    left: 30%;
    animation-duration: 5.5s;
    animation-delay: 1s;
    width: 3px;
    height: 5px;
    background-color: rgba(255, 165, 0, 0.9);
  }

  .ember:nth-child(3) {
    left: 50%;
    animation-duration: 6s;
    animation-delay: 1.5s;
    width: 3px;
    height: 4px;
    background-color: rgba(255, 140, 0, 0.8);
  }

  .ember:nth-child(4) {
    left: 70%;
    animation-duration: 5s;
    animation-delay: 0.5s;
    width: 3px;
    height: 5px;
    background-color: rgba(255, 99, 71, 0.85);
  }

  .ember:nth-child(5) {
    left: 90%;
    animation-duration: 6.5s;
    animation-delay: 2s;
    width: 3px;
    height: 3px;
    background-color: rgba(255, 165, 0, 0.9);
  }
`;

//// fire

const FireAnimation: React.FC<FireAnimationProps> = ({ customStyles }) => {
  return (
    <div css={[fireAnimationStyles, customStyles]}>
      <div className="embers-container">
        <div className="ember"></div>
        <div className="ember"></div>
        <div className="ember"></div>
        <div className="ember"></div>
        <div className="ember"></div>
      </div>

    </div>
  );
};

export default FireAnimation;
