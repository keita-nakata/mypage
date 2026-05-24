'use client'

import React from 'react';
import { Typography, Box, Chip } from '@mui/material';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillBar: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <Box>
      <Typography
        sx={{
          mb: 2,
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'text.primary',
          borderLeft: '3px solid #00ffff',
          pl: 1.5,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="medium"
            sx={{
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: '#1a1a2e',
              color: '#ffffff',
              border: '1px solid #00ffff',
              '&:hover': { backgroundColor: '#00ffff', color: '#000000' },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkillBar;
