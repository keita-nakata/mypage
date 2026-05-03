import React from 'react';
import { Typography, Box } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(160deg, #f0f0f0 60%, #e0fafa 100%)',
      px: { xs: 2, md: 4 },
      textAlign: 'center',
    }}>
      <Typography
        variant="h2"
        sx={{ letterSpacing: '0.15em', fontSize: { xs: '2.2rem', md: '3.5rem' } }}
      >
        KEITA NAKATA
      </Typography>
      <Typography
        variant="h5"
        sx={{ letterSpacing: '0.2em', mt: 1, color: 'text.secondary', fontSize: { xs: '1rem', md: '1.25rem' } }}
      >
        SOFTWARE ENGINEER
      </Typography>
    </Box>
  );
};

export default Hero;
