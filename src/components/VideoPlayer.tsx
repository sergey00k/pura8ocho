import React, { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { play } from 'ionicons/icons';
import { Box } from '@mui/material';




const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


interface VideoPlayerProps {
  videoPath: string; // Path to the video
  thumbnailPath: string; // Path to the thumbnail
  customStyles?: React.CSSProperties; // Optional custom styles
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, thumbnailPath, customStyles }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const videoElement = videoRef.current;
      console.log('handleFullscreenChange trigggered')
      if (!document.fullscreenElement && videoElement) {
        // Exit fullscreen or closing the native player
        setIsPlaying(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div style={{ maxWidth: '100%', margin: 'auto', ...customStyles }}>
      {!isPlaying ? (
        <div
          onClick={handlePlay}
          style={{
            backgroundImage: thumbnailPath, // Dynamic path to your thumbnail
            backgroundSize: 'cover',
            width: screenWidth * 0.31,
            height: screenHeight * 0.3,
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <img src={thumbnailPath} style={{ width: screenWidth * 0.333, height: screenHeight * 0.3, objectFit: 'cover', position: 'absolute', zIndex: 1,}} />
          <Box style={{backgroundColor: 'black',position: 'absolute', zIndex: 3, opacity: 0.35, width: screenWidth * 0.33333, height: screenHeight * 0.3, alignItems: 'center'}}></Box>

          <IonIcon     icon={play} size={'40px'}    style={{
              zIndex: 5,
              position: 'relative',
              color: 'white',
              height: screenWidth * 0.08, width: screenWidth * 0.08,
              textShadow: '0 0 10px rgba(0,0,0,0.7)',
            }} />

            <p style={{fontSize: 26, position: 'absolute', color:'white'}}>{isPlaying}</p>
        </div>
      ) : (
        <video
          controls
          style={{ width: '100%', height: 'auto' }} // Responsive design
          autoPlay
          onPause={() => setIsPlaying(false)}
          ref={videoRef}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
