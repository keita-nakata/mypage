import { BlogTag as BlogTagType } from '@/types/blog'
import { Chip } from '@mui/material'

interface BlogTagProps {
  tag: BlogTagType
}

export default function BlogTag({ tag }: BlogTagProps) {
  return (
    <Chip
      label={tag.name}
      size="small"
      sx={{
        fontFamily: 'Fredoka',
        fontWeight: 500,
        backgroundColor: 'rgba(0, 255, 255, 0.15)',
        color: 'text.primary',
      }}
    />
  )
}
