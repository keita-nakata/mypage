import React from 'react';
import { Box, Typography } from '@mui/material';

const Contact: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      px: { xs: 3, sm: 5, md: 8 },
      py: { xs: 4, md: 0 },
      backgroundColor: '#ffffff',
      borderTop: '1px solid #ccc',
      minHeight: { xs: 'auto', md: 150 },
      alignItems: 'center',
    }}>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 400, letterSpacing: '0.1em' }}>Keita Nakata</Typography>
        <Typography variant="body2" sx={{ fontFamily: 'sans-serif', fontWeight: 500 }}>中田 啓太</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>keita.prog823@gmail.com</Typography>
      </Box>
    </Box>
  );
};

export default Contact;
