import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import BlogCard from '@/app/components/blog/BlogCard';
import BlogTag from '@/app/components/blog/BlogTag';
import { blogPosts } from '@/data/en/blogData';

export default function BlogListPage() {
  const allTags = [...new Set(blogPosts.flatMap((p) => p.tags))];

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 4, display: 'inline-block', '&:hover': { color: 'primary.main' } }}
          >
            ← Portfolio
          </Typography>
        </Link>

        <Typography variant="h3" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: 1 }}>
          Blog
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 2 }}>
          Articles about web development, personal projects, and what I learn.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 5 }}>
          {allTags.map((tag) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
