import CreateBlogForm from '@/app/admin/components/CreateBlogForm'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Tag } from '@/app/admin/components/TagSelector'

type TagRow = {
  id: string
  name: string
  slug: string
}

export default async function CreateBlogPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  const initialTags: Tag[] = data.map((tag: TagRow) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  }))

  return <CreateBlogForm initialTags={initialTags} />
}
