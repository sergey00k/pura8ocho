import React, { useEffect, useState, CSSProperties, ReactNode } from 'react';

interface ScrollAnimationProps {
  children?: ReactNode;
  customStyle?: CSSProperties;
  notAnimated?: boolean;
  startOffsetPoint: number; // Y value to trigger animation
  animationDistance?: number; // Distance to slide
  animationDuration?: number; // Duration of animation in seconds
  directionXY: string;
  directionLeftRight?: string
  delay?: number
}

const PresetSlideAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  customStyle,
  notAnimated = false,
  startOffsetPoint,
  animationDistance = 100, // Default slide distance (100px)
  animationDuration = 0.5, // Default animation duration (0.5s)
  directionXY = 'Y',
  directionLeftRight = '',
  delay = 0
}) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (directionXY === 'Y') {
        console.log(scrollTop, ' scrollTop')
      }

      // Check if user has scrolled past the trigger point
      if (scrollTop >= startOffsetPoint) {
        setTimeout(() => {
            setTriggered(true);
        }, delay)
      } else {
        setTriggered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startOffsetPoint]);

  // Animation styles
  const animationStyle: CSSProperties = {
    transform: triggered
      ? `translate${directionXY}(0)` // Final position after animation
      : `translate${directionXY}(${directionLeftRight}${animationDistance}px)`, // Start position before animation
    opacity: triggered ? 1 : 0, // Fade in when triggered
    transition: notAnimated
      ? undefined
      : `transform ${animationDuration}s ease-out, opacity ${animationDuration}s ease-out`, // Smooth animation
    ...customStyle, // Apply custom styles
  };

  return <div style={animationStyle}>{children}</div>;
};

export default PresetSlideAnimation;
