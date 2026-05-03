'use client';

import React from 'react';
import { Link, Element } from 'react-scroll';
import NextLink from 'next/link';
import Hero from '@/app/components/Hero';
import Profile from '@/app/components/Profile';
import Works from '@/app/components/Works';
import Contact from '@/app/components/Contact';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f0f0f0',
    }}>
      {/* ナビゲーションバー */}
      <AppBar position="sticky" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Link to="hero" spy={true} smooth={true} offset={-70} duration={500}>
            <Button color="inherit">HOME</Button>
          </Link>
          <Link to="profile" spy={true} smooth={true} offset={-70} duration={500}>
            <Button color="inherit">ABOUT</Button>
          </Link>
          <Link to="works" spy={true} smooth={true} offset={-70} duration={500}>
            <Button color="inherit">WORKS</Button>
          </Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
            <Button color="inherit">CONTACT</Button>
          </Link>
          <NextLink href="/blog" style={{ textDecoration: 'none' }}>
            <Button color="inherit">BLOG</Button>
          </NextLink>
        </Toolbar>
      </AppBar>

      {/* コンテンツセクション */}
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
