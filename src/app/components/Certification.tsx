import React from "react";
import { Typography, Box } from "@mui/material";
import { certifications } from "@/data/en/certifications";

const Certification: React.FC = () => {
    return (
        <Box sx={{
            margin: "50px 100px 50px 100px",
            padding: 0,
        }}>
            <Typography variant="h4" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: '30px' }}>
                CERTIFICATIONS
            </Typography>
            <Box sx={{ marginLeft: '30px' }}>
                {certifications.map((cert, index) => (
                    <Box key={index} sx={{ marginBottom: '10px' }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Fredoka', fontWeight: 500 }}>
                            {cert}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Certification;
