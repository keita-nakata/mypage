'use client'

import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import WorkItem from './WorkItem';
import WorkItemDialog from './WorkItemDialog';
import { works, Work } from '@/data/en/works';

const Works: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleOpenDialog = (work: Work) => {
    setSelectedWork(work);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedWork(null);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mb: { xs: 6, md: '100px' },
      pt: { xs: 6, md: 8 },
    }}>
      <Typography variant="h4" sx={{ letterSpacing: '0.1em', textAlign: 'center' }}>
        WORKS
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: { xs: 2, md: 3 },
        mt: '30px',
        width: '100%',
        maxWidth: 1200,
        px: { xs: 2, md: 4 },
      }}>
        {works.map((work, index) => (
          <WorkItem
            key={index}
            imageSrc={work.imageSrc}
            title={work.title}
            onClick={() => handleOpenDialog(work)}
          />
        ))}
      </Box>

      {selectedWork && (
        <WorkItemDialog
          open={openDialog}
          onClose={handleCloseDialog}
          imageSrcList={selectedWork.imageList}
          title={selectedWork.title}
          description={selectedWork.description}
          technologies={selectedWork.technologies}
          githubUrl={selectedWork.githubUrl}
          publicUrl={selectedWork.publicUrl}
          slideUrl={selectedWork.slideUrl}
        />
      )}
    </Box>
  );
};

export default Works;
