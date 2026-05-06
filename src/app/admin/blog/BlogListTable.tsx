'use client'

import { useRouter } from 'next/navigation'
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import type { BlogTag } from '@/types/blog'

type Post = {
  id: string
  title: string
  status: 'draft' | 'published'
  created_at: string
  tags: BlogTag[]
}

export default function BlogListTable({ posts }: { posts: Post[] }) {
  const router = useRouter()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Tags</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              hover
              onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{post.title}</TableCell>
              <TableCell>
                <Chip
                  label={post.status}
                  size="small"
                  color={post.status === 'published' ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {new Date(post.created_at).toLocaleDateString('ja-JP')}
              </TableCell>
            </TableRow>
          ))}
          {posts.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 4, color: 'text.secondary' }}
              >
                No blog posts yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
