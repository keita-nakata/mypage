import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UrlBox from './UrlBox';
const githubLogo = '/img/common/github_2111432.png';
const publicLogo = '/img/common/globe.png';
const slideLogo = '/img/common/presentation.png';

interface WorkItemDialogProps {
  open: boolean;
  onClose: () => void;
  imageSrcList: string[];
  title: string;
  description: string[];
  technologies: string;
  githubUrl?: string;
  publicUrl?: string;
  slideUrl?: string;
}

const WorkItemDialog: React.FC<WorkItemDialogProps> = ({
  open, onClose, imageSrcList, title, description, technologies,
  githubUrl = '', publicUrl = '', slideUrl = '',
}) => {
  const [selectedImage, setSelectedImage] = useState(imageSrcList[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ m: { xs: 0.5, md: 1 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2 }}>
          {/* Description */}
          <Box sx={{ width: { xs: '100%', md: '40%' }, padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {description.map((text, index) => (
                <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                  {text}
                </Typography>
              ))}
            </Box>
            <Typography variant="h5" sx={{ mt: '30px' }}>
              Technologies
            </Typography>
            <Typography variant="body1">{technologies}</Typography>
            <Box sx={{ justifyContent: 'flex-start', mt: '30px', display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap' }}>
              {githubUrl && <UrlBox url={githubUrl} iconUrl={githubLogo} label="Github" />}
              {publicUrl && <UrlBox url={publicUrl} iconUrl={publicLogo} label="Web" />}
              {slideUrl && <UrlBox url={slideUrl} iconUrl={slideLogo} label="Slide" />}
            </Box>
          </Box>

          {/* Images */}
          <Box sx={{ width: { xs: '100%', md: '55%' }, padding: { xs: 1, md: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 500 },
              maxHeight: { xs: 280, md: 500 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {imageSrcList.map((image, index) => (
                <Box key={index} sx={{ width: '50px', height: '50px', cursor: 'pointer' }}>
                  <img
                    src={image}
                    alt={`sample-${index + 1}`}
                    style={{
                      width: '100%', height: '100%',
                      border: selectedImage === image ? '2px solid blue' : 'none',
                      objectFit: 'cover',
                    }}
                    onClick={() => handleImageClick(image)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default WorkItemDialog;
