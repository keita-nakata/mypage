import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Box, Container, Divider, Typography } from '@mui/material'
import BlogTag from '@/app/components/blog/BlogTag'
import { getPublishedBlogPostBySlug } from '@/lib/blogs'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const post = await getPublishedBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              marginBottom: 5,
              display: 'inline-block',
              '&:hover': { color: 'primary.main' },
            }}
          >
            ← Back to Blog
          </Typography>
        </Link>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: 'Fredoka',
            fontWeight: 500,
            marginBottom: 1,
          }}
        >
          {post.title}
        </Typography>

        {formattedDate && (
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 1.5 }}
          >
            Published on {formattedDate}
          </Typography>
        )}

        {post.tags && post.tags.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
              marginBottom: 5,
            }}
          >
            {post.tags.map((tag) => (
              <BlogTag key={tag} tag={tag} />
            ))}
          </Box>
        )}

        <Divider sx={{ marginBottom: 5 }} />

        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            padding: 4,
          }}
        >
          <Typography
            component="pre"
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              fontFamily: 'inherit',
              margin: 0,
            }}
          >
            {post.content}
          </Typography>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Link href="/blog" style={{ textDecoration: 'none' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              ← Back to Blog
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
