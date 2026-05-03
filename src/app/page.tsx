'use client';

import React, { useState } from 'react';
import { Link, Element } from 'react-scroll';
import NextLink from 'next/link';
import Hero from '@/app/components/Hero';
import Profile from '@/app/components/Profile';
import Works from '@/app/components/Works';
import Contact from '@/app/components/Contact';
import {
  AppBar, Toolbar, Button, Container, Box, Typography,
  IconButton, Drawer, List, ListItemButton, ListItemText, Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { label: 'HOME',    to: 'hero' },
  { label: 'ABOUT',   to: 'profile' },
  { label: 'WORKS',   to: 'works' },
  { label: 'CONTACT', to: 'contact' },
];

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: { xs: 'rgba(240,240,240,0.97)', md: 'transparent' },
          boxShadow: { xs: '0 1px 3px rgba(0,0,0,0.08)', md: 'none' },
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map(({ label, to }) => (
              <Link key={to} to={to} spy smooth offset={-70} duration={500}>
                <Button color="inherit">{label}</Button>
              </Link>
            ))}
            <NextLink href="/blog" style={{ textDecoration: 'none' }}>
              <Button color="inherit">BLOG</Button>
            </NextLink>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
            aria-label="open navigation"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation">
          <List>
            {navItems.map(({ label, to }) => (
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
            <Divider />
            <NextLink href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="BLOG" />
              </ListItemButton>
            </NextLink>
          </List>
        </Box>
      </Drawer>

      <Container style={{ padding: 0 }} maxWidth={false}>
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="profile">
          <Profile />
        </Element>
        <Element name="works">
          <Works />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </Container>
    </div>
  );
};

export default App;
