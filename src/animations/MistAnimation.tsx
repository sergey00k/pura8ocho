/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

const animate = keyframes`
  0% {
    transform: translateY(0) scaleX(1);
    opacity: 0;
  }
  15% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(-75px) scaleX(7);
  }
  95% {
    opacity: 0;
  }
  100% {
    transform: translateY(-150px) scaleX(10);
  }
`;

const steam1Styles = css`
  width: 200px;
  height: 600px;
  background: transparent;
  border-color: transparent;
  position: relative;
  justify-content: center;
  
  border-style: inset;
  box-shadow: 10px 10px 11px black;
  overflow: hidden;
`;

const anima1Styles = css`
  display: flex;
  justify-content: center;
  width: 200px;

`;

const spanStyles = (i: number) => css`
  position: relative;
  bottom: -550px;
  right: -28px;
  margin: 0 2px 50px;
  min-width: 8px;
  height: 120px;
  background: white;
  border-color: transparent;
  border-radius: 50%;
  animation: ${animate} 3s linear infinite;
  opacity: 0;
  filter: blur(8px);
  animation-delay: calc(${i} * 1s);
`;

const CSSMistAnimation: React.FC = () => {
  return (
    <div css={steam1Styles}>
      <div css={anima1Styles}>
        {/* Mist animation spans */}
        <span css={spanStyles(0.5)}></span>
        <span css={spanStyles(0.3)}></span>
        <span css={spanStyles(1.5)}></span>
        <span css={spanStyles(2.5)}></span>
        <span css={spanStyles(0.1)}></span>
        <span css={spanStyles(0.1)}></span>
        <span css={spanStyles(1.5)}></span>
        <span css={spanStyles(1)}></span>
      </div>
    </div>
  );
};

export default CSSMistAnimation;
