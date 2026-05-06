import { getTags } from '@/lib/tags'
import {
  createTestTagAction,
  updateTestTagAction,
  deleteTestTagAction,
} from './actions'
import TagSelector from '../admin/components/TagSelector'
import CreateBlogForm from '../admin/components/CreateBlogForm'

export default async function TestBlogCrudPage() {
  const tags = await getTags()

  return (
    <main style={{ padding: 40 }}>
      <h1>Test Blog CRUD</h1>
      <h2>Created Tag</h2>
      <form action={createTestTagAction}>
        <button type="submit">Create Tag</button>
      </form>
      <form action={updateTestTagAction}>
        <button type="submit">update Tag</button>
      </form>
      <form action={deleteTestTagAction}>
        <button type="submit">delete Tag</button>
      </form>
      <pre>{JSON.stringify(tags, null, 2)}</pre>
      <CreateBlogForm initialTags={tags} />
    </main>
  )
}
