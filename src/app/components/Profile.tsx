import React from 'react'
import { Typography, Box } from '@mui/material'
import BasicInfo from './BasicInfo'
import SkillSet from './SkillSet'
import Certification from './Certification'
import LineComponent from './LineComponent'

const Profile: React.FC = () => {
  return (
    <Box
      sx={{
        mt: { xs: 2, md: '30px' },
        mb: { xs: 3, md: '50px' },
        pb: { xs: 6, md: '100px' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          letterSpacing: '0.1em',
          mt: { xs: 4, md: '50px' },
          textAlign: 'center',
        }}
      >
        ABOUT ME
      </Typography>
      <BasicInfo />
      <LineComponent />
      <SkillSet />
      <LineComponent />
      <Certification />
    </Box>
  )
}

export default Profile
