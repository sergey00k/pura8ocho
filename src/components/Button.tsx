/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  customCss?: any; // Optional additional class for custom styles
}

const Button: React.FC<ButtonProps> = ({ text, onClick, customCss }) => {

  return (
<button
  onClick={onClick}
  css={[
    css`
      font-size: 14px;
      color: white;
      margin-top: 16px;
      margin-bottom: 24px;
      background: linear-gradient(to right, #5A0C9D, #9F2D99);
      border-radius: 30px;
      padding: 10px 20px;
      height: 40px;
      width: 200px;
      border: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
      }
    `,
    customCss, // Spread custom styles here
  ]}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)'; // Lift effect on hover
    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)'; // Increased shadow on hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)'; // Reset on mouse out
    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)'; // Reset shadow
  }}
>
  {text}
</button>

  );
};

export default Button;
