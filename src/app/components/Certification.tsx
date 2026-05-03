import React from "react";
import { Typography, Box } from "@mui/material";
import { certifications } from "@/data/en/certifications";

const Certification: React.FC = () => {
  return (
    <Box sx={{
      mx: { xs: 2, sm: 4, md: '50px', lg: '100px' },
      my: { xs: 3, md: '50px' },
    }}>
      <Typography variant="h4" sx={{ mb: '30px' }}>CERTIFICATIONS</Typography>
      <Box sx={{ ml: { xs: 1, md: '30px' } }}>
        {certifications.map((cert, index) => (
          <Box key={index} sx={{ mb: '10px' }}>
            <Typography variant="h6">{cert}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Certification;
