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
      <div>
        {skillCategories.map((category) => (
          <SkillBar
            key={category.title}
            data={category.data}
            title={category.title}
            backgroundColor={category.backgroundColor}
          />
        ))}
      </div>
    </Box>
  );
};

export default SkillSet;
