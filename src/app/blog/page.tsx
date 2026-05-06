import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'
import BlogCard from '@/app/components/blog/BlogCard'
import BlogTag from '@/app/components/blog/BlogTag'
import { getPublishedBlogPosts } from '@/lib/blogs'

type BlogListPageProps = {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const { tag: activeTagSlug } = await searchParams

  const allBlogPosts = await getPublishedBlogPosts()

  const blogPosts = activeTagSlug
    ? allBlogPosts.filter((post) =>
        post.tags.some((t) => t.slug === activeTagSlug),
      )
    : allBlogPosts

  const allTagsMap = new Map(
    allBlogPosts.flatMap((p) => p.tags ?? []).map((t) => [t.slug, t]),
  )
  const allTags = [...allTagsMap.values()]

  const activeTag = activeTagSlug
    ? allTags.find((t) => t.slug === activeTagSlug)
    : null

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              marginBottom: 4,
              display: 'inline-block',
              '&:hover': { color: 'primary.main' },
            }}
          >
            ← Portfolio
          </Typography>
        </Link>

        <Typography
          variant="h3"
          sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: 1 }}
        >
          Blog
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', marginBottom: 3 }}
        >
          Articles about web development, personal projects, and what I learn.
        </Typography>

        {allTags.length > 0 && (
          <Box
            sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 4 }}
          >
            {allTags.map((tag) => (
              <BlogTag
                key={tag.slug}
                tag={tag}
                active={tag.slug === activeTagSlug}
              />
            ))}
          </Box>
        )}

        {activeTag && (
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 2 }}
          >
            「{activeTag.name}」の記事 {blogPosts.length} 件
          </Typography>
        )}

        {blogPosts.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: 'text.secondary', mt: 4 }}>
            {activeTagSlug
              ? 'このタグの記事はまだありません。'
              : 'No blog posts found.'}
          </Typography>
        )}
      </Container>
    </Box>
  )
}
