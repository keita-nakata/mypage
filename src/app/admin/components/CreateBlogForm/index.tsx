'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Alert,
  Box,
  Button,
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
import { createTag, createBlogPost } from './actions'

type CreateBlogFormProps = {
  initialTags: Tag[]
}

export default function CreateBlogForm({ initialTags }: CreateBlogFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contentTab, setContentTab] = useState<'write' | 'preview'>('write')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateTag = async (name: string) => {
    const createdTag = await createTag(name)
    setTags((prevTags) => {
      const alreadyExists = prevTags.some((tag) => tag.id === createdTag.id)
      if (alreadyExists) return prevTags
      return [...prevTags, createdTag]
    })
    return createdTag
  }

  const handleSubmit = async () => {
    setError(null)
    setIsSubmitting(true)
    try {
      const selectedTagIds = selectedTags.map((tag) => tag.id)
      const { slug } = await createBlogPost({
        title,
        content,
        tagIds: selectedTagIds,
        status,
      })
      if (status === 'published') {
        router.push(`/blog/${slug}`)
      } else {
        router.push('/blog')
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create blog post',
      )
      setIsSubmitting(false)
    }
  }

  return (
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
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Create Blog Post
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setContent(event.target.value)}
              multiline
              minRows={12}
              fullWidth
              placeholder="Write in Markdown..."
              slotProps={{
                input: { sx: { fontFamily: 'monospace', fontSize: 14 } },
              }}
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
            onChange={(event) =>
              setStatus(event.target.value as 'draft' | 'published')
            }
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

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </Stack>
    </Paper>
  )
}
