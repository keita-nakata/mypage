import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/app/admin/components/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {user && (
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Admin
            </Typography>
            <LogoutButton />
          </Toolbar>
        </AppBar>
      )}
      {children}
    </Box>
  )
}
