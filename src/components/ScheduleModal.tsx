import React from 'react';
import { Modal, Box, Slide } from '@mui/material';

interface Schedule {
  id: number;
  time: string;
  day: string;
  type: string;
}

interface SlideModalProps {
  isVisible: boolean;
  onClose: () => void;
  schedules: Schedule[] | null;
}

const ScheduleModal: React.FC<SlideModalProps> = ({ isVisible, onClose, schedules }) => {
    if (!schedules) {
        return (<></>)
    }
  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
        <Box
          style={{
            ...styles.modalContent,
            overflow: 'hidden',
          }}
        >
          <h3 style={styles.modalTitle}>{`${schedules ? schedules[0]?.type : ''} Sauna Schedules`}</h3>
          <Box style={styles.scheduleList}>
            {schedules.map((schedule) => (
              <Box key={schedule.id} style={styles.scheduleItem}>
                <p style={styles.scheduleTime}>{schedule.day}</p>
                <p style={styles.scheduleDescription}>{schedule.time}</p>
              </Box>
            ))}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    backgroundColor: 'black',
    paddingTop: '2vh',
    paddingBottom: '2vh',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '70vw',
    paddingLeft: '10vw',
    paddingRight: '10vw'
  },
  modalTitle: {
    color: 'white',
    fontSize: '16px',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '15px',
  },
  scheduleList: {
    width: '100%',
    maxHeight: '70vh',
    overflowY: 'auto',
    backgroundColor: 'black',
    borderRadius: '10px',
    padding: '10px',

  },
  scheduleItem: {
    marginBottom: '10px',
    paddingTop: '1vw',
    paddingBottom: '1vw',
    paddingLeft: '6vw',
    paddingRight: '6vw',
    background: 'linear-gradient(to right, #5A0C9D, #9F2D99)',
    borderRadius: '40px',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scheduleTime: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  scheduleDescription: {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};

export default ScheduleModal;
