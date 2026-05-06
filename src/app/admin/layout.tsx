import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import LogoutButton from '@/app/admin/components/LogoutButton'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Admin
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  )
}
