import React from 'react';
import { Typography, Box } from '@mui/material';
import SkillBar from './SkillBar';
import { skillCategories } from '@/data/en/skills';

const SkillSet: React.FC = () => {
    return (
        <Box sx={{
            margin: "50px 100px 50px 100px",
            padding: 0,
        }}>
            <Typography variant="h4" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: "30px" }}>SKILL SET</Typography>
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
