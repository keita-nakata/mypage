import React from "react";
import { Typography, Box } from "@mui/material";
import HobbyItem from "./HobbyItem";
import { hobbies } from "@/data/en/hobbies";

const HobbyList: React.FC = () => {
  return (
    <Box>
      {hobbies.map((hobby, index) => (
        <HobbyItem
          key={index}
          imageUrl={hobby.imageUrl}
          title={hobby.title}
          description={hobby.description}
          reverse={index % 2 !== 0}
          scale={hobby.scale}
        />
      ))}
    </Box>
  );
};

const Hobby: React.FC = () => {
  return (
    <Box sx={{
      mx: { xs: 2, sm: 4, md: '50px', lg: '100px' },
      my: { xs: 3, md: '50px' },
    }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: '50px' } }}>HOBBY</Typography>
      <HobbyList />
    </Box>
  );
};

export default Hobby;
