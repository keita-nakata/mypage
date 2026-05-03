import { Chip } from '@mui/material';

interface BlogTagProps {
  tag: string;
}

export default function BlogTag({ tag }: BlogTagProps) {
  return (
    <Chip
      label={tag}
      size="small"
      sx={{
        fontFamily: 'Fredoka',
        fontWeight: 500,
        backgroundColor: 'rgba(0, 255, 255, 0.15)',
        color: 'text.primary',
      }}
    />
  );
}
