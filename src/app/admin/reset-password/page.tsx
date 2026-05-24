'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/update-password`,
    })
    setSubmitted(true)
    setIsLoading(false)
  }

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>メール送信完了</Typography>
          <Typography color="text.secondary">
            パスワードリセット用のリンクを <strong>{email}</strong> に送りました。メールを確認してください。
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>パスワードリセット</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          登録したメールアドレスにリセットリンクを送ります。
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? '送信中...' : 'リセットリンクを送る'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/admin/login" style={{ fontSize: '0.875rem', color: 'inherit' }}>
            ← ログインに戻る
          </Link>
        </Box>
      </Paper>
    </Box>
  )
}
