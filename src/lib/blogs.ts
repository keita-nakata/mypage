import { createClient } from '@/lib/supabase/server'
import type { BlogPost, BlogTag } from '@/types/blog'

// supabase returns the related data in a nested structure, so we need to flatten it
type BlogPostRow = Omit<BlogPost, 'tags'> & {
  tags?: {
    tag: BlogTag | null
  }[]
}

function toBlogPost(row: BlogPostRow): BlogPost {
  return {
    ...row,
    tags:
      row.tags
        ?.map((item) => item.tag)
        .filter((tag): tag is BlogTag => tag !== null) ?? [],
  }
}

// get blog posts with their tags
const blogPostSelect = `
  *,
  tags:blog_post_tags (
    tag:tags (
      id,
      name,
      slug
    )
  )
`

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(blogPostSelect)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }

  return data?.map((row) => toBlogPost(row as BlogPostRow)) ?? []
}

export async function getPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(blogPostSelect)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }

  return data ? toBlogPost(data as BlogPostRow) : null
}

export async function incrementBlogView(slug: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.rpc('increment_blog_view', {
    post_slug: slug,
  })

  if (error) {
    console.error('Failed to increment blog view:', error)
    return false
  }

  return true
}
