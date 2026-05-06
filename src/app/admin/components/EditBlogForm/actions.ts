'use server'

import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

type UpdateBlogPostInput = {
  title: string
  content: string
  tagIds: string[]
  status: 'draft' | 'published'
  currentPublishedAt: string | null
}

export async function updateBlogPost(
  id: string,
  input: UpdateBlogPostInput,
): Promise<void> {
  const { title, content, tagIds, status, currentPublishedAt } = input

  const trimmedTitle = title.trim()
  if (!trimmedTitle) throw new Error('Title is required')
  if (!content.trim()) throw new Error('Content is required')

  const published_at =
    status === 'published'
      ? (currentPublishedAt ?? new Date().toISOString())
      : null

  const supabase = createAdminClient()

  const { error: postError } = await supabase
    .from('blog_posts')
    .update({
      title: trimmedTitle,
      content: content.trim(),
      status,
      published_at,
    })
    .eq('id', id)

  if (postError) throw new Error(postError.message)

  const { error: deleteTagError } = await supabase
    .from('blog_post_tags')
    .delete()
    .eq('blog_post_id', id)

  if (deleteTagError) throw new Error(deleteTagError.message)

  if (tagIds.length > 0) {
    const { error: tagError } = await supabase
      .from('blog_post_tags')
      .insert(tagIds.map((tagId) => ({ blog_post_id: id, tag_id: tagId })))

    if (tagError) throw new Error(tagError.message)
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = createAdminClient()

  await supabase.from('blog_post_tags').delete().eq('blog_post_id', id)

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) throw new Error(error.message)

  redirect('/admin/blog')
}
