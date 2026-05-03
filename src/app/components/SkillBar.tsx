import React from "react";
import { Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { proficiencyLabels } from '@/data/en/skills';

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  backgroundColor?: string;
}

const SkillBar: React.FC<BarChartProps> = ({ data, title, backgroundColor = 'rgba(255, 255, 0, 0.4)' }) => {
  const fixedBarHeight = 30;
  const totalHeight = fixedBarHeight * data.length + 100;

  return (
    <Box sx={{
      margin: '20px',
      backgroundColor: backgroundColor,
      borderRadius: '30px',
    }}>
      <Typography variant="h6" sx={{ marginLeft: '30px', paddingTop: '10px' }}>{title}</Typography>
      <ResponsiveContainer width="90%" height={totalHeight}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            ticks={[0, 1, 2, 3]}
            tickFormatter={(value) => proficiencyLabels[value]}
          />
          <YAxis dataKey="name" type="category" width={120} interval={0} />
          <Bar dataKey="value" fill="#8884d8" maxBarSize={fixedBarHeight} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SkillBar;
