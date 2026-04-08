import './Home.scss';
import sg_logo from "../logo.png";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { redirectToSpotify } from '../../utils/SpotifyAuth';

const Home = () => {

  const [token, setToken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('code_verifier')
  }

  const searchMyInfo = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    await Promise.all([
      fetchTopArtists('long_term', 25, 'topArtists3'),
      fetchTopTracks('long_term', 25, 'topTracks3'),
      fetchTopArtists('medium_term', 25, 'topArtists2'),
      fetchTopTracks('medium_term', 25, 'topTracks2'),
      fetchTopArtists('short_term', 25, 'topArtists1'),
      fetchTopTracks('short_term', 25, 'topTracks1'),
    ])
    navigate('/my-info', { state: { dataState: [data] } })
  }

  const fetchTopArtists = async (time, amount, key) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${token}` },
      params: { time_range: time, limit: amount }
    })
    localStorage.setItem(key, JSON.stringify(data.items))
  }

  const fetchTopTracks = async (time, amount, key) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: { Authorization: `Bearer ${token}` },
      params: { time_range: time, limit: amount }
    })
    localStorage.setItem(key, JSON.stringify(data.items))
  }

  const title = "Taste Test"

  return (
    <div className="App">

      <div className="banner">
        <div>
          {token &&
            <NavLink className="myinfo-link" to="/my-info">
              <button className="myInfo-home" onClick={searchMyInfo}>My Info</button>
            </NavLink>
          }
        </div>
        <div>
          {token
            ? <button className="login-logout-home" onClick={logout}>Logout</button>
            : <button className="login-logout-home" onClick={redirectToSpotify}>Login</button>
          }
        </div>
      </div>

      <div className="hero">

        <motion.div
          className="logo-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img className="logo" src={sg_logo} alt="logo" />
        </motion.div>

        <motion.div className="title-wrapper">
          {title.split("").map((letter, index) => (
            <motion.span
              className={`title-letter ${letter === " " ? "title-space" : ""}`}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          How well do you know your music taste?
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {token &&
            <NavLink className="play-link" style={{ width: '100%' }} to="/play">
              <button className="play">
                <span className="play-btn-inner">
                  <span className="play-icon">▶</span>
                  Play Now
                </span>
              </button>
            </NavLink>
          }

          <NavLink className="about-link" style={{ width: '100%' }} to="/about">
            <button className="about">About</button>
          </NavLink>
        </motion.div>

      </div>

    </div>
  )
}

export default Home