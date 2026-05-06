import NextLink from 'next/link'
import { Box, Button, Typography } from '@mui/material'
import BlogCard from '@/app/components/blog/BlogCard'
import type { BlogPost } from '@/types/blog'

export default function RecentBlogs({ posts }: { posts: BlogPost[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h4" sx={{ letterSpacing: '0.1em', textAlign: 'center' }}>
        BLOG
      </Typography>

      <Box
        sx={{
          mt: '30px',
          width: '100%',
          maxWidth: 800,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
            No posts yet.
          </Typography>
        )}
      </Box>

      <NextLink href="/blog" style={{ textDecoration: 'none', marginTop: 32 }}>
        <Button variant="contained" size="large" color="primary">
          View all posts →
        </Button>
      </NextLink>
    </Box>
  )
}
