'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button variant="outlined" size="small" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  )
}
