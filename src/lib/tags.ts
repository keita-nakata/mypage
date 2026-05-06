import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from './supabase/admin'
import type { BlogTag } from '@/types/blog'

export async function getTags(): Promise<BlogTag[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tags')
    .select('id, slug, name')
    .order('name', { ascending: true })

  if (error) {
    console.error('failed to get tags: ', error)
    return []
  }

  return data ?? []
}

export async function createTag(
  slug: string,
  name: string,
): Promise<BlogTag | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tags')
    .insert({ slug: slug, name: name })
    .select('id, slug, name')
    .single()

  if (error) {
    console.error('failed to create a tag: ', error)
    return null
  }

  console.log('created a tag successfully: ', data)

  return data
}

export async function updateTag(
  id: string,
  slug: string,
  name: string,
): Promise<BlogTag | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tags')
    .update({ slug: slug, name: name })
    .eq('id', id)
    .select('id, slug, name')
    .single()

  if (error) {
    console.error('failed to update a tag: ', error)
    return null
  }

  console.log('updated a tag successfully: ', data)

  return data
}

export async function deleteTag(id: string): Promise<BlogTag | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tags')
    .delete()
    .eq('id', id)
    .select('id, slug, name')
    .single()

  if (error) {
    console.error('failed to delete a tag: ', error)
    return null
  }

  console.log('deleted a tag successfully: ', data)

  return data
}
