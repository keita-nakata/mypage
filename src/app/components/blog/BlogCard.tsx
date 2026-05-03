import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import BlogTag from './BlogTag';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          backgroundColor: 'white',
          transition: '0.2s',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Fredoka', fontWeight: 600, marginBottom: 0.5, color: 'text.primary' }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1.5 }}>
          {post.description}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: 1 }}>
          {formattedDate}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </Box>
      </Box>
    </Link>
  );
}
