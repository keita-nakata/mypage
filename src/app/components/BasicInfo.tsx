import React from 'react';
import { Typography, Box } from '@mui/material';
import { basicInfo } from '@/data/en/basicInfo';

const faceImage = '/img/profile/face.jpeg';

const BasicInfo: React.FC = () => {
  const { name, origin, belonging, research } = basicInfo;

  return (
    <Box sx={{
      mx: { xs: 2, sm: 4, md: '80px', lg: '130px' },
      mt: { xs: 4, md: '80px' },
      mb: { xs: 3, md: '50px' },
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      gap: { xs: 3, md: 0 },
    }}>
      <Box component="img"
        src={faceImage}
        alt="Profile"
        sx={{
          width: { xs: 140, sm: 160, md: 200 },
          height: { xs: 140, sm: 160, md: 200 },
          borderRadius: '50%',
          mr: { xs: 0, md: 8 },
          flexShrink: 0,
        }}
      />
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h4" sx={{ fontFamily: 'EB Garamond', fontWeight: 600, letterSpacing: '0.1em', mb: 3 }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 0 }}>{origin}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{belonging}</Typography>
        <Typography variant="body1">{research}</Typography>
      </Box>
    </Box>
  );
};

export default BasicInfo;
