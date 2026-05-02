import React from 'react';
import { Typography, Box } from '@mui/material';
import { basicInfo } from '@/data/en/basicInfo';

const faceImage = '/img/profile/face.jpeg';

const BasicInfo: React.FC = () => {
    const { name, origin, belonging, research } = basicInfo;

    return (
        <Box sx={{
            margin: "100px 130px 50px 130px",
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Box>
                <img src={faceImage} alt="Profile" style={{ width: 200, height: 200, borderRadius: 100, marginRight: 80 }} />
            </Box>
            <Box>
                <Typography variant="h4" sx={{ fontFamily: 'EB Garamond', fontWeight: 600, letterSpacing: "0.1em", marginBottom: 3 }}>{name}</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: 0 }}>{origin}</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: 2 }}>{belonging}</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Fredoka', fontWeight: 500 }}>{research}</Typography>
            </Box>
        </Box>
    );
};

export default BasicInfo;
