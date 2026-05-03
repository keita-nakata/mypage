import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types/blog'

type BlogPostRow = Omit<BlogPost, 'tags'> & {
  tags?: {
    tag: {
      name: string
      slug: string
    } | null
  }[]
}

function normalizeBlogPost(row: BlogPostRow): BlogPost {
  return {
    ...row,
    tags:
      row.tags?.flatMap((item) => {
        if (!item.tag) {
          return []
        }

        return [item.tag.name]
      }) ?? [],
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      tags:blog_post_tags (
        tag:tags (
          name,
          slug
        )
      )
    `,
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }

  return data?.map((row) => normalizeBlogPost(row as BlogPostRow)) ?? []
}

export async function getPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      tags:blog_post_tags (
        tag:tags (
          name,
          slug
        )
      )
    `,
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }

  return normalizeBlogPost(data as BlogPostRow)
}
