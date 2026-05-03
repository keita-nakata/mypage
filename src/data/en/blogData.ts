import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "migrating-portfolio-to-nextjs",
    title: "Migrating My Portfolio to Next.js",
    description:
      "Why I moved my portfolio from a plain React SPA to Next.js App Router, and what I had to change along the way.",
    publishedAt: "2026-04-15",
    tags: ["Next.js", "React", "TypeScript"],
    relatedProject: "Portfolio Site",
    content: [
      {
        heading: "Background",
        body: [
          "My original portfolio was a single-page React app deployed on GitHub Pages. It worked fine as a static site, but adding a blog or any new routes meant reaching for react-router and building everything from scratch.",
          "I also wanted better SEO and a structure that would scale as I added content. Next.js App Router made both goals easy without much boilerplate.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "The biggest structural change was moving from a single App.tsx entry point to the file-based App Router. Each route is now a page.tsx file in a directory, which makes the URL structure obvious just by reading the folder tree.",
          "Image handling changed too. In the old setup I imported images as modules directly with paths like /img/foo.png. Next.js with Turbopack does not support server-relative imports, so all images in public/ now need to be referenced as plain URL strings rather than imported.",
          "MUI required a new setup as well. The App Router integration uses AppRouterCacheProvider from @mui/material-nextjs, which replaces the old EmotionCache pattern needed for SSR.",
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          "Read the migration guide before upgrading. Next.js 16 introduced a breaking change where route params are now a Promise — accessing params.slug directly without awaiting it no longer works in server components.",
          "MUI v9 also removed shorthand system props (flex, p, textAlign, etc.) directly on Box and Typography. Everything needs to go through the sx prop. The TypeScript errors made these easy to find, but they add up quickly in a codebase that used them heavily.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-16-turbopack-image-imports",
    title: "Fixing Image Import Errors in Next.js 16 + Turbopack",
    description:
      "A quick fix for the 'server relative imports are not implemented yet' error when migrating an existing project to Next.js 16 with Turbopack.",
    publishedAt: "2026-05-02",
    tags: ["Next.js", "Turbopack", "TypeScript"],
    relatedProject: "Portfolio Site",
    content: [
      {
        heading: "The error",
        body: [
          "After switching to Next.js 16 with Turbopack, the build failed with dozens of 'Module not found' errors. The root cause message was: 'server relative imports are not implemented yet. Please try an import relative to the file you are importing from.'",
          "The offending imports looked like this: import ramenPrev from '/img/works/ramen-prev.png'. The leading slash makes it a server-relative path — Turbopack cannot resolve these.",
        ],
      },
      {
        heading: "Why this happens",
        body: [
          "Files under public/ in Next.js are served as static assets, not processed by the bundler. The correct way to reference them is as URL strings (e.g. '/img/works/ramen-prev.png'), not as module imports.",
          "The old webpack bundler was more permissive about these paths. Turbopack enforces the distinction strictly.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Replace every import statement for a public/ image with a plain const string. For example: const ramenPrev = '/img/works/ramen-prev.png'. Since the value is just a URL string that ends up in an src attribute, the TypeScript types stay exactly the same.",
          "The same rule applies to any component that was importing images with relative paths like ./img/common/foo.png — if the file lives under public/, use the public URL string instead.",
        ],
      },
    ],
  },
];
