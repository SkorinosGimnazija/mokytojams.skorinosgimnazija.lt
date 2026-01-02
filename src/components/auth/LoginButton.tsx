import { useAuth } from '@/hooks/useAuth.tsx'
import { errorNotification } from '@/utils/notifications.ts'
import { Center } from '@mantine/core'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

export function LoginButton() {
  const auth = useAuth()

  if (auth.isAuthenticated || auth.isLoading) {
    return null
  }

  return (
    <GoogleOAuthProvider locale="lt" clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <Center>
        <GoogleLogin
          theme="outline"
          size="large"
          shape="pill"
          hosted_domain={import.meta.env.VITE_APP_DOMAIN}
          onSuccess={e => auth.login({ token: e.credential! })}
          onError={() => errorNotification({ title: 'Prisijungimo klaida' })}
        />
      </Center>
    </GoogleOAuthProvider>
  )
}