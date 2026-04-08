const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return crypto.subtle.digest('SHA-256', data)
}

const base64UrlEncode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export const generateCodeVerifier = () => generateRandomString(128)

export const generateCodeChallenge = async (verifier) => {
  const hashed = await sha256(verifier)
  return base64UrlEncode(hashed)
}

export const getToken = async (code) => {
  const verifier = localStorage.getItem('code_verifier')

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    code_verifier: verifier
  })

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })

  const data = await response.json()
  return data
}

export const redirectToSpotify = async () => {
  localStorage.removeItem('code_verifier')
  
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('code_verifier', verifier)

  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    scope: 'user-top-read',
    code_challenge_method: 'S256',
    code_challenge: challenge
  })

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}