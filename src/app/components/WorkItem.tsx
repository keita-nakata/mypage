import React from 'react';
import { Box, Typography } from '@mui/material';

interface WorkItemProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
}

const WorkItem: React.FC<WorkItemProps> = ({ imageSrc, title, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        overflow: 'hidden',
        transition: 'transform 0.3s',
        '&:hover': {
          cursor: 'pointer',
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        sx={{
          width: '100%',
          height: 'auto',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <Box sx={{ px: 1, pb: 1 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default WorkItem;
