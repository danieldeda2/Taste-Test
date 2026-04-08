import React from 'react'
import './Play.scss'
import axios from 'axios';
import sg_logo from '../logo.png'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const Play = () => {

    const [activeButton1, setActiveButton1] = useState(false)
    const [activeButton2, setActiveButton2] = useState(false)
    const [activeButton3, setActiveButton3] = useState(false)

    const [buttonClicks, setButtonClicks] = useState(0)
    const [questions, setQuestions] = useState(0)

    const [wrongButton1, setWrongButton1] = useState(false)
    const [wrongButton2, setWrongButton2] = useState(false)
    const [wrongButton3, setWrongButton3] = useState(false)

    const [sameDisplay, setSameDisplay] = useState(false)
    const [display_status, setDisplay_status] = useState(false);
    const [playlistDisplay, setPlaylistDisplay] = useState(true);

    const [display1, setDisplay1] = useState("");
    const [display2, setDisplay2] = useState("");
    const [display3, setDisplay3] = useState("");

    const [displayQuestion, setDisplayQuestion] = useState("");
    const [mixedArray, setMixedArray] = useState([])
    const [token, setToken] = useState("")

    const navigate = useNavigate();

    const playlists = [];
    let playlist_id = ""
    let artists = []
    let available = []
    let artistIndex = 0;
    let questionIndex = 0;

    const title = "Taste Test"

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
            fetchPlaylists(storedToken)
        } else {
            navigate('/')
        }
    }, [])

    const fetchPlaylists = async (storedToken) => {
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: { Authorization: `Bearer ${storedToken}` },
                params: { limit: 20 }
            })
            localStorage.setItem("data", JSON.stringify(data))
        } catch (error) {
            console.error("Error fetching playlists:", error)
        }
    }

    async function fetchKey() {
        try {
            const response = await axios.get('https://chat-gpt-api-key-zsd3m.ondigitalocean.app/chatgpt-key');
            return response.data.key;
        } catch (error) {
            console.error('Error fetching key:', error);
            return null;
        }
    }

    function initializeAvailable(available) {
        for (let i = 0; i < 100; i++)
            available[i] = [0, 0, 0, 0];
    }

    function generateArtistIndex() {
        return Math.floor(Math.random() * artists.length)
    }

    function generateQuestionIndex() {
        return Math.floor(Math.random() * 4)
    }

    function isAvailable(artistIndex, questionIndex) {
        return available[artistIndex][questionIndex] === 0;
    }

    function assembleQuestion(artistIndex, questionIndex) {
        switch (questionIndex) {
            case 0:
                return `In only 3 words, Please tell me what country the artist ${artists[artistIndex]} is originally from and then give me 2 other countries. only Respond with only 3 countries separated by commas with the correct answer being the first, nothing else`;
            case 1:
                return `In only three words, please tell me what nationality the artist ${artists[artistIndex]} is and then give me 2 other random nationalities. Respond with only 3 nationalities separated by commas with the correct answer being the first, nothing else`;
            case 2:
                return `In only 3 numbers, Give me the age of the artist ${artists[artistIndex]} as of October 31st 2024. Then give me 2 numbers that are randomly not more than 10 from the answer. Return ONLY 3 numbers separated by commas with the first number being the answer, nothing else`;
            case 3:
                return `In only three numbers, please tell me what year the artist ${artists[artistIndex]} released their first single and then give me 2 other random years not too far from that and don't let them be equidistant from that year. Only respond with 3 numbers separated by commas, nothing else`;
        }
    }

    function assembleDisplay(artistIndex, questionIndex) {
        switch (questionIndex) {
            case 0:
                return `What country is the artist ${artists[artistIndex]} originally from?`;
            case 1:
                return `What is the nationality of artist ${artists[artistIndex]}?`;
            case 2:
                return `How old is the artist ${artists[artistIndex]}?`;
            case 3:
                return `In which year did the artist ${artists[artistIndex]} release their first single?`;
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function button1click() {
        setDisplay_status(true);
        if (mixedArray[0] === display1) {
            setActiveButton1(true);
            await delay(500);
            setActiveButton1(false);
            setQuestions(questions + 1);
            setButtonClicks(buttonClicks + 1);
            getQuestion();
        } else {
            setSameDisplay(true);
            setWrongButton1(true);
            await delay(500);
            setWrongButton1(false);
            setButtonClicks(buttonClicks + 1);
        }
    }

    async function button2click() {
        setDisplay_status(true);
        if (mixedArray[1] === display1) {
            setActiveButton2(true);
            await delay(500);
            setActiveButton2(false);
            setQuestions(questions + 1);
            setButtonClicks(buttonClicks + 1);
            getQuestion();
        } else {
            setSameDisplay(true);
            setWrongButton2(true);
            await delay(500);
            setWrongButton2(false);
            setButtonClicks(buttonClicks + 1);
        }
    }

    async function button3click() {
        if (mixedArray[2] === display1) {
            setActiveButton3(true);
            await delay(500);
            setActiveButton3(false);
            setQuestions(questions + 1);
            setButtonClicks(buttonClicks + 1);
            getQuestion();
        } else {
            setSameDisplay(true);
            setWrongButton3(true);
            await delay(500);
            setWrongButton3(false);
            setButtonClicks(buttonClicks + 1);
        }
    }

    async function getQuestion() {
        artists = JSON.parse(localStorage.getItem("newArtists"));
        setActiveButton1(false);
        setActiveButton2(false);
        setActiveButton3(false);
        setDisplay_status(true);

        artistIndex = generateArtistIndex();
        questionIndex = generateQuestionIndex();

        while (!isAvailable(artistIndex, questionIndex)) {
            artistIndex = generateArtistIndex();
            questionIndex = generateQuestionIndex();
        }

        available[artistIndex][questionIndex] = 1;

        const key = await fetchKey();
        chatGPT_API(assembleQuestion(artistIndex, questionIndex), key);
        setDisplayQuestion(assembleDisplay(artistIndex, questionIndex));
        setSameDisplay(false);
        display();
    }

    function display() {
        return (
            <div className="question">
                <p className="displayQuestion">{displayQuestion}</p>
                <div className='buttons_column'>
                    <button className={activeButton1 ? 'button1green' : wrongButton1 ? 'buttonRed' : 'button1'} onClick={button1click}>{mixedArray[0]}</button>
                    <button className={activeButton2 ? 'button2green' : wrongButton2 ? 'buttonRed' : 'button2'} onClick={button2click}>{mixedArray[1]}</button>
                    <button className={activeButton3 ? 'button3green' : wrongButton3 ? 'buttonRed' : 'button3'} onClick={button3click}>{mixedArray[2]}</button>
                </div>
            </div>
        )
    }

    async function chatGPT_API(question, key) {
        let data = JSON.stringify({
            "model": "gpt-4o-2024-05-13",
            "messages": [{ "role": "user", "content": question }]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const string = response.data.choices[0].message.content;
                let s = string.split(",")
                setDisplay1(s[0])
                setDisplay2(s[1])
                setDisplay3(s[2])
                setMixedArray(generateOrder(s));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function generateOrder(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const navigateHome = () => navigate('/')

    const logout = () => {
        setToken("")
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("code_verifier")
        navigate('/')
    }

    function displayPlaylists() {
        if (localStorage.getItem("data") === null)
            return <h6>No playlists found, please create a playlist on Spotify to play.</h6>

        let playlistArray = JSON.parse(localStorage.getItem("data"));
        playlistArray = playlistArray.items;

        playlists.push(<h5 key="0">Please select a playlist below:</h5>)

        for (let i = 0; i < playlistArray.length; i++) {
            playlists.push(
                <button className="playlists" key={i + 1} onClick={() => changeParameters(i)}>
                    <img src={playlistArray[i].images[0].url} alt="playlist"/>
                    <h3>{playlistArray[i].name}</h3>
                </button>)
        }

        return playlists
    }

    function backToPlaylists() {
        setDisplay_status(false);
        setPlaylistDisplay(true);
    }

    async function changeParameters(i) {
        setPlaylistDisplay(false);
        setDisplay_status(true);

        let playlistArray = JSON.parse(localStorage.getItem("data"));
        playlistArray = playlistArray.items;

        playlist_id = playlistArray[i].id;

        await getArtistsFromPlaylist();
        getQuestion();
    }

    const getArtistsFromPlaylist = async () => {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                playlist_id: `${playlist_id}`,
                fields: "items(track(artists))"
            }
        })

        let tempArray = []
        for (let i = 0; i < data.items.length; i++) {
            tempArray[i] = data.items[i].track.artists[0].name;
        }

        localStorage.setItem("newArtists", JSON.stringify(tempArray));
    }

    return (
        <div className='App'>

            {initializeAvailable(available)}

            <div className="banner">
                <button className="home-play" onClick={navigateHome}>Home</button>
                {token
                    ? <button className="login-logout-play" onClick={logout}>Logout</button>
                    : <button className="login-logout-play" onClick={() => navigate('/')}>Login</button>
                }
            </div>

            <img className="logo" src={sg_logo} alt="logo"/>

            <motion.div className="spotify_guess">
                {title.split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {playlistDisplay &&
                <div className="playlist-scroll-container">
                    {displayPlaylists()}
                </div>
            }

            {display_status ? display() : <br/>}
            {display_status ? <h6>{questions} / {buttonClicks}</h6> : <br/>}
            {display_status ?
                <div className='returnToPlaylists'><button onClick={backToPlaylists}>Return to playlists</button></div>
                : <br/>}

        </div>
    )
}

export default Play