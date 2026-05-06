export type BlogSection = {
  heading: string
  body: string[]
}

export type BlogTag = {
  id: string
  name: string
  slug: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  content: string
  thumbnail_url: string | null
  status: 'draft' | 'published'
  locale: string
  published_at: string | null
  created_at: string
  updated_at: string
  tags: BlogTag[]
  view_count: number
}

export type CreateBlogPostInput = {
  slug: string
  title: string
  content: string
  thumbnail_url?: string | null
  status?: 'draft' | 'published'
  locale?: string
  published_at?: string | null
  tagIds?: string[]
}

export type UpdateBlogPostInput = {
  slug?: string
  title?: string
  content?: string
  thumbnail_url?: string | null
  status?: 'draft' | 'published'
  locale?: string
  published_at?: string | null
  tagIds?: string[]
}
