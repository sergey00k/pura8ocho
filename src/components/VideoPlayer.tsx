import React, { useState } from 'react';

interface VideoPlayerProps {
  videoPath: string; // Path to the video
  thumbnailPath: string; // Path to the thumbnail
  customStyles?: React.CSSProperties; // Optional custom styles
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, thumbnailPath, customStyles }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div style={{ maxWidth: '100%', margin: 'auto', ...customStyles }}>
      {!isPlaying ? (
        <div
          onClick={handlePlay}
          style={{
            backgroundImage: `url(${thumbnailPath})`, // Dynamic path to your thumbnail
            backgroundSize: 'cover',
            width: '100%',
            height: 'auto',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '40px',
              textShadow: '0 0 10px rgba(0,0,0,0.7)',
            }}
          >
            ▶️
          </div>
        </div>
      ) : (
        <video
          controls
          style={{ width: '100%', height: 'auto' }} // Responsive design
          autoPlay
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
