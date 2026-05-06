import { Container } from '@mui/material'
import NavBar from '@/app/components/NavBar'
import Hero from '@/app/components/Hero'
import Profile from '@/app/components/Profile'
import Works from '@/app/components/Works'
import RecentBlogs from '@/app/components/RecentBlogs'
import Contact from '@/app/components/Contact'
import { getPublishedBlogPosts } from '@/lib/blogs'

export default async function App() {
  const recentPosts = (await getPublishedBlogPosts()).slice(0, 3)

  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <NavBar />
      <Container style={{ padding: 0 }} maxWidth={false}>
        <div id="hero"><Hero /></div>
        <div id="profile"><Profile /></div>
        <div id="works"><Works /></div>
        <div id="blog"><RecentBlogs posts={recentPosts} /></div>
        <div id="contact"><Contact /></div>
      </Container>
    </div>
  )
}
