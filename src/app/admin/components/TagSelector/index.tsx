'use client'

import { useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { createSlug } from '@/lib/slug'

export type Tag = {
  id: string
  name: string
  slug: string
}

const tagColors = [
  {
    backgroundColor: '#f3d4d0',
    textColor: '#4b2b24',
  },
  {
    backgroundColor: '#ead1dc',
    textColor: '#4b2b4b',
  },
  {
    backgroundColor: '#ddd2cc',
    textColor: '#4b2b24',
  },
  {
    backgroundColor: '#f4e4bd',
    textColor: '#4b3315',
  },
  {
    backgroundColor: '#d2e6fb',
    textColor: '#1d3f63',
  },
  {
    backgroundColor: '#d9ead3',
    textColor: '#274e13',
  },
  {
    backgroundColor: '#cfe2f3',
    textColor: '#1c4587',
  },
  {
    backgroundColor: '#eeeeee',
    textColor: '#333333',
  },
]

const getTagColor = (key: string) => {
  let hash = 0

  for (let i = 0; i < key.length; i += 1) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % tagColors.length

  return tagColors[index]
}

type TagSelectorProps = {
  tags: Tag[]
  selectedTags: Tag[]
  onChange: (tags: Tag[]) => void
  onCreateTag?: (name: string) => Tag | Promise<Tag>
}

const isValidTagName = (name: string) => {
  return /^[a-zA-Z0-9\s-]+$/.test(name.trim())
}

export default function TagSelector({
  tags,
  selectedTags,
  onChange,
  onCreateTag,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = useState('')

  const selectedTagIds = useMemo(
    () => new Set(selectedTags.map((tag) => tag.id)),
    [selectedTags],
  )

  const filteredTags = useMemo(() => {
    const keyword = inputValue.trim().toLowerCase()

    return tags.filter((tag) => {
      const isSelected = selectedTagIds.has(tag.id)
      const matchesKeyword =
        keyword === '' || tag.name.toLowerCase().includes(keyword)

      return !isSelected && matchesKeyword
    })
  }, [tags, selectedTagIds, inputValue])

  const trimmedInput = inputValue.trim()

  const exactMatchedTag = tags.find(
    (tag) => tag.name.toLowerCase() === trimmedInput.toLowerCase(),
  )

  const isValidInput = trimmedInput !== '' && isValidTagName(trimmedInput)

  const canCreateTag = isValidInput && !exactMatchedTag

  const handleSelect = (tag: Tag) => {
    onChange([...selectedTags, tag])
    setInputValue('')
  }

  const handleRemove = (tagId: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== tagId))
  }

  const handleCreateTag = async () => {
    const name = inputValue.trim()

    if (!name) return

    if (!isValidTagName(name)) return

    if (onCreateTag) {
      const createdTag = await onCreateTag(name)
      onChange([...selectedTags, createdTag])
    } else {
      const newTag: Tag = {
        id: crypto.randomUUID(),
        name,
        slug: createSlug(name),
      }

      onChange([...selectedTags, newTag])
    }

    setInputValue('')
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.nativeEvent.isComposing) {
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()

      if (filteredTags.length > 0 && !canCreateTag) {
        handleSelect(filteredTags[0])
        return
      }

      if (canCreateTag) {
        await handleCreateTag()
      }
    }

    if (
      event.key === 'Backspace' &&
      inputValue === '' &&
      selectedTags.length > 0
    ) {
      const lastTag = selectedTags[selectedTags.length - 1]
      handleRemove(lastTag.id)
    }
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {/* Selected tags + search/create input */}
      <Box
        sx={{
          p: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          minHeight: 72,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {selectedTags.map((tag) => {
          const tagColor = getTagColor(tag.slug)

          return (
            <Chip
              key={tag.id}
              label={tag.name}
              onDelete={() => handleRemove(tag.id)}
              deleteIcon={<CloseIcon />}
              sx={{
                backgroundColor: tagColor.backgroundColor,
                color: tagColor.textColor,
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 1,
                '& .MuiChip-deleteIcon': {
                  color: 'inherit',
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1,
                  },
                },
              }}
            />
          )
        })}

        <InputBase
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? 'タグを検索または作成' : ''}
          sx={{
            flexGrow: 1,
            minWidth: 160,
            fontSize: 16,
            px: 0.5,
          }}
        />
      </Box>

      {/* Options area */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontWeight: 700,
          }}
        >
          オプションを選択するか作成します
        </Typography>

        {trimmedInput !== '' && !isValidInput && (
          <Typography color="error" sx={{ px: 1, py: 1 }}>
            タグ名は英数字・スペース・ハイフンのみ使用できます
          </Typography>
        )}

        <Stack spacing={1}>
          {canCreateTag &&
            (() => {
              const previewSlug = createSlug(trimmedInput)
              const tagColor = getTagColor(previewSlug)

              return (
                <Box
                  onClick={handleCreateTag}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    py: 0.75,
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f4f2f0',
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                    }}
                  >
                    作成:
                  </Box>

                  <Box
                    component="span"
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: 1,
                      backgroundColor: tagColor.backgroundColor,
                      color: tagColor.textColor,
                      fontWeight: 700,
                      fontSize: 18,
                      lineHeight: 1.4,
                    }}
                  >
                    {trimmedInput}
                  </Box>
                </Box>
              )
            })()}

          {filteredTags.map((tag) => {
            const tagColor = getTagColor(tag.slug)

            return (
              <Box
                key={tag.id}
                onClick={() => handleSelect(tag)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1,
                  py: 0.75,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f4f2f0',
                  },
                }}
              >
                <DragIndicatorIcon
                  sx={{
                    color: 'text.disabled',
                    fontSize: 22,
                  }}
                />

                <Box
                  component="span"
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 1,
                    backgroundColor: tagColor.backgroundColor,
                    color: tagColor.textColor,
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: 1.4,
                  }}
                >
                  {tag.name}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation()
                    // later: open tag menu
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            )
          })}

          {filteredTags.length === 0 && !canCreateTag && (
            <Typography color="text.secondary" sx={{ px: 1, py: 1 }}>
              表示できるタグがありません
            </Typography>
          )}
        </Stack>
      </Box>
    </Paper>
  )
}
