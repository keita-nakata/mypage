import Link from 'next/link'
import { Box, Button, Stack, Typography } from '@mui/material'
import { createAdminClient } from '@/lib/supabase/admin'
import type { BlogTag } from '@/types/blog'
import BlogListTable from './BlogListTable'

type PostRow = {
  id: string
  title: string
  status: 'draft' | 'published'
  created_at: string
  tags: { tag: BlogTag | null }[]
}

export default async function AdminBlogListPage() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id, title, status, created_at,
      tags:blog_post_tags (
        tag:tags (id, name, slug)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const posts = (data as unknown as PostRow[]).map((row) => ({
    ...row,
    tags: row.tags
      .map((item) => item.tag)
      .filter((tag): tag is BlogTag => tag !== null),
  }))

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Blog Posts
        </Typography>
        <Link href="/admin/blog/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained">+ Create New</Button>
        </Link>
      </Stack>

      <BlogListTable posts={posts} />
    </Box>
  )
}
