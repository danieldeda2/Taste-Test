import React from 'react'
import './About.scss'
import sg_logo from '../logo.png'
import { useState } from 'react'
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import img1 from '../about_img1.png';
import img2 from '../about_img2.png';
import img3 from '../about_img3.png';
import img4 from '../about_img4.png';
import img5 from '../about_img5.png';

const About = () => {

    const title = "Taste Test"
    const [token, setToken] = useState("")

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    const navigate = useNavigate();

    const homeChange = () => {
        let path = `/`
        navigate(path)
    }

    return (
        <div className="AboutApp">

            <div className="about-banner">
                <button className="about-home-btn" onClick={homeChange}>Home</button>
            </div>

            <img className="about-logo" src={sg_logo} alt="logo"/>

            <motion.div className="about-title">
                {title.split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: index * 0.1 }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            <div className='about-list'>

                <h1>About</h1>

                <h3 className='txt1'>Taste Test works by interacting with both the Spotify and the ChatGPT API. An API is just a program that allows you to obtain/give information with other programs (like Spotify/ChatGPT).</h3>
                <img className='img1' src={img1} alt=""/>

                <h3 className='txt2'>When a user signs into their Spotify account via Taste Test, we use their authentication credentials to talk to Spotify and ask it for data about the user (top tracks, artists, etc).</h3>
                <img className="img2" src={img2} alt=""/>

                <h3 className="txt3">We then display that data to the user in the My Info section:</h3>
                <img className="img3" src={img3} alt=""/>

                <h3 className="txt4">We also use it to talk to ChatGPT in order to obtain information about your favorite artists:</h3>
                <img className="img4" src={img4} alt=""/>

                <h3 className="txt5">We then use everything to assemble the question and display it to the user, and then keep iterating until user wants to quit or play another playlist.</h3>
                <img className="img5" src={img5} alt=""/>

                <h3 className="txt6">In short: you signing into Taste Test lets us display your Spotify Wrapped (top artists and tracks) and make a trivia game tailored to your favorite Spotify artists.</h3>

                <h3 className="txt7">*Please note: since we use ChatGPT for the question generation, not all questions will be accurate. ChatGPT doesn't have the correct information all the time, and especially for foreign artists, so the accuracy of this game is limited by the accuracy of ChatGPT.*</h3>

            </div>

        </div>
    );
}

export default About