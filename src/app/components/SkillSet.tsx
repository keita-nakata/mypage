import React from 'react';
import { Typography, Box } from '@mui/material';
import SkillBar from './SkillBar';
import { skillCategories } from '@/data/en/skills';

const SkillSet: React.FC = () => {
  return (
    <Box sx={{
      mx: { xs: 2, sm: 4, md: '50px', lg: '100px' },
      my: { xs: 3, md: '50px' },
    }}>
      <Typography variant="h4" sx={{ mb: '30px' }}>SKILL SET</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 4, md: 5 },
        }}
      >
        {skillCategories.map((category) => (
          <SkillBar
            key={category.title}
            title={category.title}
            skills={category.skills}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkillSet;
