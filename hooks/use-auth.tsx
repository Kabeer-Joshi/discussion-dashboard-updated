import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function useAuth() {
  const router = useRouter()

  return {
    isAuthenticated: !!Cookies.get('access_token'),
    getAccessToken: () => Cookies.get('access_token'),
    getRefreshToken: () => Cookies.get('refresh_token'),
    logout: () => {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      router.push('/auth/login')
    }
  }
} 
