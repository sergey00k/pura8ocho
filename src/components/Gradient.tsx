import React from "react";

export const BottomGradientBox = ({ customStyle = {} }) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
          position: 'absolute',
          top: 70,
          zIndex: 4,
          ...customStyle, // Merge with customStyle prop
        }}
      />
    );
  };
  
  export const TopGradientBox = ({ customStyle = {} }) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))', // Fades from bottom to top
          position: 'absolute',
          top: 70,
          zIndex: 4,
          ...customStyle, // Merge with customStyle prop
        }}
      />
    );
  };
  