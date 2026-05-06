'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import type { Tag } from '@/app/admin/components/TagSelector'

const isValidTagName = (name: string) => {
  return /^[a-zA-Z0-9\s-]+$/.test(name.trim())
}

const createSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

type CreateBlogPostInput = {
  title: string
  content: string
  tagIds: string[]
  status: 'draft' | 'published'
}

export async function createBlogPost(input: CreateBlogPostInput): Promise<{ id: string; slug: string }> {
  const { title, content, tagIds, status } = input

  const trimmedTitle = title.trim()
  if (!trimmedTitle) throw new Error('Title is required')
  if (!content.trim()) throw new Error('Content is required')

  const slug = createSlug(trimmedTitle)
  if (!slug) throw new Error('Invalid title for slug generation')

  const supabase = createAdminClient()

  const { data: post, error: postError } = await supabase
    .from('blog_posts')
    .insert({
      title: trimmedTitle,
      slug,
      content: content.trim(),
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    })
    .select('id, slug')
    .single()

  if (postError) {
    if (postError.code === '23505') {
      throw new Error('A blog post with this title already exists')
    }
    throw new Error(postError.message)
  }

  if (tagIds.length > 0) {
    const { error: tagError } = await supabase
      .from('blog_post_tags')
      .insert(tagIds.map((tagId) => ({ blog_post_id: post.id, tag_id: tagId })))

    if (tagError) throw new Error(tagError.message)
  }

  return { id: post.id, slug: post.slug }
}

type TagRow = {
  id: string
  name: string
  slug: string
}

const toTag = (row: TagRow): Tag => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
})

export async function createTag(name: string): Promise<Tag> {
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error('Tag name is required')
  }

  if (!isValidTagName(trimmedName)) {
    throw new Error(
      'Tag name can only contain English letters, numbers, spaces, and hyphens',
    )
  }

  const slug = createSlug(trimmedName)

  if (!slug) {
    throw new Error('Invalid tag slug')
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tags')
    .insert({
      name: trimmedName,
      slug,
    })
    .select('id, name, slug')
    .single()

  if (error) {
    // unique 制約に引っかかった場合は、既存タグを返す
    if (error.code === '23505') {
      const { data: existingTag, error: findError } = await supabase
        .from('tags')
        .select('id, name, slug')
        .eq('slug', slug)
        .single()

      if (findError) {
        throw new Error(findError.message)
      }

      return toTag(existingTag)
    }

    throw new Error(error.message)
  }

  return toTag(data)
}
