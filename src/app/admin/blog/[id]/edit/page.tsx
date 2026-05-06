import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import type { BlogTag } from '@/types/blog'
import type { Tag } from '@/app/admin/components/TagSelector'
import EditBlogForm from '@/app/admin/components/EditBlogForm'

type BlogPostRow = {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  tags: { tag: BlogTag | null }[]
}

type EditBlogPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params

  const supabase = createAdminClient()

  const [postResult, tagsResult] = await Promise.all([
    supabase
      .from('blog_posts')
      .select(`
        id, title, slug, content, status, published_at,
        tags:blog_post_tags (
          tag:tags (id, name, slug)
        )
      `)
      .eq('id', id)
      .single(),
    supabase
      .from('tags')
      .select('id, name, slug')
      .order('name', { ascending: true }),
  ])

  if (postResult.error || !postResult.data) {
    notFound()
  }

  const row = postResult.data as unknown as BlogPostRow
  const post = {
    ...row,
    tags: row.tags
      .map((item) => item.tag)
      .filter((tag): tag is BlogTag => tag !== null),
  }

  const allTags: Tag[] = (tagsResult.data ?? []).map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  }))

  return <EditBlogForm post={post} allTags={allTags} />
}
