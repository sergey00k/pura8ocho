import React, { useEffect, useState, CSSProperties, ReactNode } from 'react';

interface ScrollAnimationProps {
  children?: ReactNode;
  customStyle?: CSSProperties;
  notAnimated?: boolean;
  startOffsetPoint: number;
  direction?: string;
  fadeLength?: number
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, customStyle, notAnimated, startOffsetPoint, direction = '', fadeLength = 0.5 }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setOffset(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const animationStyle: CSSProperties = {
    transform: notAnimated ? undefined : (offset - startOffsetPoint) * fadeLength < 0 ? '0px' : `translateX(${direction}${(offset - startOffsetPoint) * fadeLength}px)`, // Sliding effect
    opacity: notAnimated ? undefined : 1 - Math.min((offset - startOffsetPoint) / 80, 1), // Fade-out as user scrolls down (up to 500px)
    transition: notAnimated ? undefined : 'transform 0.1s linear, opacity 0.1s linear', // Smooth fade and slide
    width: '100%', // Default width
    height: '10vh', // Default height
    backgroundColor: 'transparent', // Default background color
    position: 'absolute',
    zIndex: 3,
    ...customStyle, // Apply custom styles
  };

  return <div style={animationStyle}>{children}</div>;
};

export default ScrollAnimation;
