import React, { useEffect, useState, useRef, CSSProperties, ReactNode } from 'react';

interface ScrollAnimationProps {
  children?: ReactNode;
  customStyle?: CSSProperties;
  notAnimated?: boolean;
  startOffsetPoint: number;
  direction?: string;
  fadeLength?: number;
  animationEnd: number;
}

const ScrollAnimationHome: React.FC<ScrollAnimationProps> = ({ children, customStyle, notAnimated, startOffsetPoint, direction = '', fadeLength = 0.5, animationEnd = 100 }) => {
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0)
  const [opacityOff, setOpacityOff] = useState(notAnimated)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > (startOffsetPoint + animationEnd)) {
        setOffset(0)
        setOpacityOff(true)
      } else {
        setOffset(scrollTop);
        setOpacityOff(false)
      }

      offsetRef.current = scrollTop
      console.log(scrollTop + 'SCROLL TOP ' + ' ANIMATION END : ' + animationEnd)
      console.log(((offsetRef.current - startOffsetPoint) > 50))
      console.log(startOffsetPoint)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const animationStyle: CSSProperties = {
    transform: notAnimated ? undefined : ((offset - startOffsetPoint) * fadeLength < 0) ? '0px' : `translateX(${direction}${(offset - startOffsetPoint) * fadeLength}px)`, // Sliding effect
    opacity: opacityOff ? 1 : Math.min((offset - startOffsetPoint) / 80, 1), // Fade-in as user scrolls down
    transition: notAnimated ? undefined : 'transform 0.1s linear, opacity 0.1s linear', // Smooth fade and slide
    width: '100%', // Default width
    height: '10vh', // Default height
    backgroundColor: 'transparent', // Default background color
    position: 'absolute',
    zIndex: 5,
    ...customStyle, // Apply custom styles
  };

  return <div style={animationStyle}>{children}</div>;
};

export default ScrollAnimationHome;
