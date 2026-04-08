import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/SpotifyAuth'

const Callback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      getToken(code).then((data) => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          navigate('/')
        } else {
          console.error('Token exchange failed:', data)
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [])

  return <p>Logging in...</p>
}

export default Callback