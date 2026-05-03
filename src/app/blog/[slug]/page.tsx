import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Container, Divider, Typography } from '@mui/material';
import BlogTag from '@/app/components/blog/BlogTag';
import { blogPosts } from '@/data/en/blogData';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', marginBottom: 5, display: 'inline-block', '&:hover': { color: 'primary.main' } }}
          >
            ← Back to Blog
          </Typography>
        </Link>

        <Typography variant="h3" sx={{ fontFamily: 'Fredoka', fontWeight: 500, marginBottom: 1 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1.5 }}>
          Published on {formattedDate}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', marginBottom: 5 }}>
          {post.tags.map((tag) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </Box>

        <Divider sx={{ marginBottom: 5 }} />

        {post.content.map((section, i) => (
          <Box key={i} sx={{ marginBottom: 5 }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'Fredoka', fontWeight: 600, marginBottom: 2 }}
            >
              {section.heading}
            </Typography>
            {section.body.map((para, j) => (
              <Typography key={j} variant="body1" sx={{ marginBottom: 1.5, lineHeight: 1.8 }}>
                {para}
              </Typography>
            ))}
          </Box>
        ))}

        {post.relatedProject && (
          <>
            <Divider sx={{ marginBottom: 4 }} />
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', marginBottom: 0.5 }}>
                Related Project
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka', fontWeight: 600 }}>
                {post.relatedProject}
              </Typography>
            </Box>
          </>
        )}

        <Box sx={{ marginTop: 5 }}>
          <Link href="/blog" style={{ textDecoration: 'none' }}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              ← Back to Blog
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
