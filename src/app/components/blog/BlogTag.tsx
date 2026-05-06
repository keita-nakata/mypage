'use client'

import NextLink from 'next/link'
import { Chip } from '@mui/material'
import { BlogTag as BlogTagType } from '@/types/blog'

interface BlogTagProps {
  tag: BlogTagType
  active?: boolean
}

export default function BlogTag({ tag, active = false }: BlogTagProps) {
  return (
    <NextLink
      href={active ? '/blog' : `/blog?tag=${tag.slug}`}
      style={{ textDecoration: 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      <Chip
        label={tag.name}
        size="small"
        clickable
        sx={{
          fontFamily: 'Fredoka',
          fontWeight: active ? 700 : 500,
          backgroundColor: active
            ? 'rgba(0, 220, 220, 0.45)'
            : 'rgba(0, 255, 255, 0.15)',
          color: 'text.primary',
          border: active ? '1px solid rgba(0, 180, 180, 0.6)' : 'none',
          '&:hover': { opacity: 0.8 },
        }}
      />
    </NextLink>
  )
}
