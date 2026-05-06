import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box } from '@mui/material'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Box
      sx={{
        lineHeight: 1.8,
        wordBreak: 'break-word',
        '& h1': { fontSize: '1.875rem', fontWeight: 700, mt: 4, mb: 1.5, lineHeight: 1.3 },
        '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 3.5, mb: 1, lineHeight: 1.3 },
        '& h3': { fontSize: '1.25rem', fontWeight: 700, mt: 3, mb: 0.75, lineHeight: 1.3 },
        '& h4, & h5, & h6': { fontWeight: 700, mt: 2.5, mb: 0.5 },
        '& p': { mb: 1.5 },
        '& ul, & ol': { pl: 3, mb: 1.5 },
        '& li': { mb: 0.5 },
        '& li > ul, & li > ol': { mt: 0.5, mb: 0 },
        '& code': {
          fontFamily: 'monospace',
          backgroundColor: '#f0f0f0',
          px: 0.75,
          py: 0.25,
          borderRadius: 0.5,
          fontSize: '0.875em',
        },
        '& pre': {
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          p: 2.5,
          borderRadius: 1,
          overflow: 'auto',
          mb: 2,
          '& code': {
            backgroundColor: 'transparent',
            px: 0,
            py: 0,
            color: 'inherit',
            fontSize: '0.875rem',
          },
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'divider',
          pl: 2,
          ml: 0,
          mr: 0,
          color: 'text.secondary',
          mb: 1.5,
          '& p': { mb: 0 },
        },
        '& a': {
          color: 'primary.main',
          textDecoration: 'underline',
          '&:hover': { opacity: 0.8 },
        },
        '& table': {
          borderCollapse: 'collapse',
          width: '100%',
          mb: 2,
          display: 'block',
          overflowX: 'auto',
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'divider',
          px: 1.5,
          py: 1,
          textAlign: 'left',
        },
        '& th': {
          backgroundColor: '#f5f5f5',
          fontWeight: 700,
        },
        '& hr': {
          border: 'none',
          borderTop: '1px solid',
          borderColor: 'divider',
          my: 3,
        },
        '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
        '& > *:first-child': { mt: 0 },
        '& > *:last-child': { mb: 0 },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  )
}
