import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(requireAuth: boolean = true) {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')

    if (requireAuth && !accessToken) {
      // If auth is required and no token exists, redirect to login
      router.push('/auth/login')
    } else if (!requireAuth && accessToken) {
      // If we're on a non-auth page (like login) and token exists, redirect to home
      router.push('/')
    }
  }, [requireAuth, router])

  return {
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    logout: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router.push('/auth/login')
    }
  }
} 
