import React from 'react'
import './MyInfo.scss'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';

const MyInfo = () => {

  const [token, setToken] = useState("")
  const [current, setCurrent] = useState(1)
  const [timeframe, setTimeframe] = useState(1)

  const navigate = useNavigate();
  const location = useLocation();
  const final = [];

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
    else navigate('/')
  }, [])

  const logout = () => {
    setToken("")
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("code_verifier")
    navigate('/')
  }

  const getArtists = (key) => JSON.parse(localStorage.getItem(key)) || []
  const getTracks = (key) => JSON.parse(localStorage.getItem(key)) || []

  const artistKeys = { 1: 'topArtists1', 2: 'topArtists2', 3: 'topArtists3' }
  const trackKeys  = { 1: 'topTracks1',  2: 'topTracks2',  3: 'topTracks3'  }
  const timeLabels = { 1: 'Last 4 weeks', 2: 'Last 6 months', 3: 'All time' }

  function displayArtists() {
    const artists = getArtists(artistKeys[timeframe])
    return (
      <div className="list">
        {artists.slice(0, 25).map((a, i) => (
          <div className="list-row" key={i}>
            <span className="rank">{i + 1}</span>
            <img src={a.images[0]?.url} alt={a.name} />
            <span className="name">{a.name}</span>
          </div>
        ))}
      </div>
    )
  }

  function displayTracks() {
    const tracks = getTracks(trackKeys[timeframe])
    return (
      <div className="list">
        {tracks.slice(0, 25).map((t, i) => (
          <div className="list-row" key={i}>
            <span className="rank">{i + 1}</span>
            <img src={t.album.images[0]?.url} alt={t.name} />
            <div className="track-info">
              <span className="name">{t.name}</span>
              <span className="artist-sub">{t.artists[0].name}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function displayProfile() {
    const user = location.state?.dataState[0]
    if (!user) return null
    return (
      <div className="profile-section">
        <div className="profile-stat">
          <span className="stat-label">Spotify ID</span>
          <span className="stat-value">{user.id}</span>
        </div>
        <div className="profile-stat">
          <span className="stat-label">Followers</span>
          <span className="stat-value">{user.followers.total}</span>
        </div>
        <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <button className="spotify-btn">Open in Spotify</button>
        </a>
      </div>
    )
  }

  const user = location.state?.dataState[0]

  return (
    <div className="App">

      <div className="banner">
        <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
        <button className="nav-btn" onClick={logout}>Logout</button>
      </div>

      <div className="myinfo-hero">
        <motion.img
          className="profile-pic"
          src={user?.images[1]?.url}
          alt="profile"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.h1
          className="display-name"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {user?.display_name}
        </motion.h1>

        <motion.div
          className="tab-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['Top Artists', 'Top Tracks', 'Profile'].map((label, i) => (
            <button
              key={i}
              className={`tab-btn ${current === i + 1 ? 'tab-active' : ''}`}
              onClick={() => setCurrent(i + 1)}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {current !== 3 && (
          <div className="timeframe-bar">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                className={`time-btn ${timeframe === t ? 'time-active' : ''}`}
                onClick={() => setTimeframe(t)}
              >
                {timeLabels[t]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="list-container">
        {current === 1 && displayArtists()}
        {current === 2 && displayTracks()}
        {current === 3 && displayProfile()}
      </div>

    </div>
  )
}

export default MyInfo