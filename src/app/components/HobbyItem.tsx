import React from 'react';
import { Box, Typography } from '@mui/material';

interface HobbyItemProps {
  imageUrl: string;
  title: string;
  description: string[];
  reverse: boolean;
  scale?: number;
}

const HobbyItem: React.FC<HobbyItemProps> = ({ imageUrl, title, description, reverse, scale = 1 }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
      justifyContent: 'space-between',
      alignItems: 'center',
      my: { xs: 4, md: '20px' },
      gap: { xs: 2, md: 0 },
    }}>
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: { xs: '80%', sm: '60%', md: `${50 * scale}%` },
          height: 'auto',
          mx: 'auto',
          ml: { md: reverse ? 0 : 6 },
          mr: { md: reverse ? 6 : 0 },
          borderRadius: 2,
          display: 'block',
        }}
      />
      <Box sx={{ flex: '1', p: { xs: 2, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
        {description.map((text, index) => (
          <Typography key={index} variant="body1" sx={{ fontFamily: 'sans-serif', fontWeight: 500, mb: 1 }}>
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default HobbyItem;
