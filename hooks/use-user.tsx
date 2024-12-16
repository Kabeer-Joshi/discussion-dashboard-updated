import { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import Cookies from 'js-cookie'

interface UserData {
  username: string
  user_type: "Professor" | "Student"
  flag: string
}

export function useUser() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (token) {
      try {
        const decoded = jwtDecode(token) as UserData
        setUserData(decoded)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  return userData
}
