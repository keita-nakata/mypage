'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import TagSelector, { Tag } from '@/app/admin/components/TagSelector'
import MarkdownRenderer from '@/app/components/blog/MarkdownRenderer'
import { createTag } from '@/app/admin/components/CreateBlogForm/actions'
import { updateBlogPost, deleteBlogPost } from './actions'

type Post = {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  tags: Tag[]
}

type EditBlogFormProps = {
  post: Post
  allTags: Tag[]
}

export default function EditBlogForm({ post, allTags }: EditBlogFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [contentTab, setContentTab] = useState<'write' | 'preview'>('write')
  const [status, setStatus] = useState<'draft' | 'published'>(post.status)
  const [tags, setTags] = useState<Tag[]>(allTags)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(post.tags)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleCreateTag = async (name: string) => {
    const createdTag = await createTag(name)
    setTags((prev) => {
      if (prev.some((t) => t.id === createdTag.id)) return prev
      return [...prev, createdTag]
    })
    return createdTag
  }

  const handleSave = async () => {
    setError(null)
    setIsSubmitting(true)
    try {
      await updateBlogPost(post.id, {
        title,
        content,
        tagIds: selectedTags.map((t) => t.id),
        status,
        currentPublishedAt: post.published_at,
      })
      router.push('/admin/blog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog post')
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBlogPost(post.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog post')
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  const isBusy = isSubmitting || isDeleting

  return (
    <>
      <Paper
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 720,
          mx: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Edit Blog Post
            </Typography>
            <Chip
              label={`slug: ${post.slug}`}
              size="small"
              variant="outlined"
              sx={{ fontFamily: 'monospace', fontSize: 12 }}
            />
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <Box>
            <Tabs
              value={contentTab}
              onChange={(_, v) => setContentTab(v)}
              sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Write" value="write" />
              <Tab label="Preview" value="preview" />
            </Tabs>

            {contentTab === 'write' ? (
              <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                minRows={12}
                fullWidth
                placeholder="Write in Markdown..."
                slotProps={{ input: { sx: { fontFamily: 'monospace', fontSize: 14 } } }}
              />
            ) : (
              <Box
                sx={{
                  minHeight: 300,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                {content.trim() ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Nothing to preview
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography sx={{ mb: 1, fontWeight: 700 }}>Tags</Typography>
            <TagSelector
              tags={tags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              onCreateTag={handleCreateTag}
            />
          </Box>

          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isBusy}
            >
              Delete
            </Button>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => router.push('/admin/blog')}
                disabled={isBusy}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={isBusy}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Blog Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            「{post.title}」を削除しますか？この操作は取り消せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={isDeleting} autoFocus>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
