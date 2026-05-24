'use client'

import React from 'react'
import { Typography, Box } from '@mui/material'
import { keyframes } from '@mui/system'

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(160deg, #f0f0f0 60%, #e0fafa 100%)',
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        pb: { xs: '112px', sm: '128px' },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          letterSpacing: '0.15em',
          fontSize: { xs: '2.2rem', md: '3.5rem' },
          animation: `${fadeSlideUp} 0.8s ease-out forwards`,
        }}
      >
        KEITA NAKATA
      </Typography>
      <Typography
        variant="h5"
        sx={{
          letterSpacing: '0.2em',
          mt: 1,
          color: 'text.secondary',
          fontSize: { xs: '1rem', md: '1.25rem' },
          opacity: 0,
          animation: `${fadeSlideUp} 0.8s ease-out 0.4s forwards`,
        }}
      >
        SOFTWARE ENGINEER
      </Typography>
    </Box>
  )
}

export default Hero
