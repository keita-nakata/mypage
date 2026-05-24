'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('パスワードが一致しません')
      return
    }
    if (password.length < 6) {
      setError('パスワードは6文字以上にしてください')
      return
    }
    setError(null)
    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }
    router.push('/admin/blog')
  }

  if (!ready) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography color="text.secondary">リセットリンクを確認中...</Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>新しいパスワードを設定</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="新しいパスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="new-password"
            />
            <TextField
              label="パスワード（確認）"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
              required
              autoComplete="new-password"
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? '更新中...' : 'パスワードを更新'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
