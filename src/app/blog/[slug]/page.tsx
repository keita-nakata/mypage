import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Box, Container, Divider, Typography } from '@mui/material'
import BlogTag from '@/app/components/blog/BlogTag'
import MarkdownRenderer from '@/app/components/blog/MarkdownRenderer'
import { getPublishedBlogPostBySlug, incrementBlogView } from '@/lib/blogs'

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

  await incrementBlogView(slug)

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container
        maxWidth="md"
        sx={{
          py: {
            xs: 4,
            md: 8,
          },
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
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
            fontSize: {
              xs: '2rem',
              sm: '2.5rem',
              md: '3rem',
            },
            lineHeight: 1.2,
            wordBreak: 'break-word',
          }}
        >
          {post.title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          {formattedDate && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', marginBottom: 1.5 }}
            >
              Published on {formattedDate}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 1.5 }}
          >
            {post.view_count} views
          </Typography>
        </Box>

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
              <BlogTag key={tag.slug} tag={tag} />
            ))}
          </Box>
        )}

        <Divider sx={{ marginBottom: 5 }} />

        <Box
          sx={{
            padding: 4,
          }}
        >
          <MarkdownRenderer content={post.content} />
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
