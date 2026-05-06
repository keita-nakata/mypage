'use client'

import { useState } from 'react'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const scrollItems = [
  { label: 'HOME',    to: 'hero' },
  { label: 'ABOUT',   to: 'profile' },
  { label: 'WORKS',   to: 'works' },
  { label: 'CONTACT', to: 'contact' },
]

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: { xs: 'rgba(240,240,240,0.97)', md: 'transparent' },
        boxShadow: { xs: '0 1px 3px rgba(0,0,0,0.08)', md: 'none' },
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {scrollItems.map(({ label, to }) => (
            <Link key={to} to={to} spy smooth offset={-70} duration={500}>
              <Button color="inherit">{label}</Button>
            </Link>
          ))}
          <NextLink href="/blog" style={{ textDecoration: 'none' }}>
            <Button color="inherit">BLOG</Button>
          </NextLink>
        </Box>

        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={() => setDrawerOpen(true)}
          aria-label="open navigation"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation">
          <List>
            {scrollItems.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                spy
                smooth
                offset={-70}
                duration={500}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemButton>
                  <ListItemText primary={label} />
                </ListItemButton>
              </Link>
            ))}
            <NextLink href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="BLOG" />
              </ListItemButton>
            </NextLink>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
