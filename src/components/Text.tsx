/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'p' | 'span' | 'div';
  style?: React.CSSProperties;
  customCss?: any; // Accept Emotion styles
  ref?: any;
}

const Text: React.FC<TextProps> = ({ children, variant = 'p', style, customCss, ref }) => {
  const Tag = variant as keyof JSX.IntrinsicElements;

  return (
    <Tag style={style} css={customCss} ref={ref}>
      {children}
    </Tag>
  );
};

export default Text;
