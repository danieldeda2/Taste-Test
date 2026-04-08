# 🎵 Taste Test

A full-stack music intelligence platform that analyzes your Spotify listening data and challenges you with AI-generated trivia tailored to your unique music taste. Built with React, Node.js, and powered by the Spotify Web API and OpenAI GPT-4.

## 🔗 Live Demo
[taste-test.io](https://taste-test.io)

## ✨ Features

- **Spotify OAuth 2.0 with PKCE** — Industry-standard authorization code flow with cryptographic code verification, ensuring zero token exposure and production-grade security
- **Real-time Spotify Data Pipeline** — Pulls your top 25 artists and tracks across three time ranges (4 weeks, 6 months, all time) in parallel using concurrent API requests
- **AI-Powered Trivia Engine** — Integrates OpenAI GPT-4 to dynamically generate personalized multiple choice questions about your favorite artists in real time
- **Smart Question System** — Tracks question/artist combinations using a state matrix to guarantee zero repetition across an entire game session
- **Playlist Intelligence** — Extracts and analyzes artist data directly from your Spotify playlists to fuel the trivia engine
- **My Info Dashboard** — Displays hidden Spotify analytics not available in the native app, including top artists and tracks across multiple time windows
- **Responsive Design** — Fully optimized for desktop and mobile with a modern glassmorphism UI

## 🚀 Tech Stack

**Frontend:**
- React 18
- Framer Motion — fluid animations and transitions
- SCSS — advanced styling with variables and mixins
- Spotify Web API
- OpenAI GPT-4 API

**Auth & Security:**
- Spotify OAuth 2.0 with PKCE (Proof Key for Code Exchange)
- Cryptographic code verifier + SHA-256 challenge generation
- Secure token management via localStorage

**Deployment:**
- Cloudflare Pages — global edge network deployment

## 🔐 How the Auth Works

Taste Test implements the OAuth 2.0 PKCE flow — the most secure authentication method available for client-side applications:

1. App generates a cryptographically random 128-character **code verifier**
2. The verifier is hashed with SHA-256 to produce a **code challenge**
3. User authenticates with Spotify and receives an **authorization code**
4. The code + original verifier are exchanged for an **access token**
5. No client secret is ever exposed — the math proves authenticity

## 🎮 How It Works

1. **Authenticate** — Log in securely with your Spotify account via OAuth 2.0 PKCE
2. **Data Collection** — App concurrently fetches your top artists and tracks across three time ranges
3. **Select Playlist** — Choose any of your Spotify playlists to fuel the trivia engine
4. **AI Generation** — GPT-4 generates real-time personalized trivia questions about your artists
5. **Play** — Answer multiple choice questions and see how well you really know your taste
6. **Explore** — Visit My Info to see your Spotify analytics across different time periods

## 📊 Question Types

- What country is this artist originally from?
- What nationality is this artist?
- How old is this artist?
- What year did this artist release their first single?

## 🛠️ Local Development

### Prerequisites
- Node.js v16+
- Spotify Developer Account
- OpenAI API Key

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/taste-test.git
cd taste-test

# Install dependencies
npm install
```

Create `.env.development`:
```env
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_REDIRECT_URI=http://127.0.0.1:3000/callback
```

In your Spotify Developer Dashboard add `http://127.0.0.1:3000/callback` as a redirect URI.

```bash
# Start development server
npm start
```

Access the app at `http://127.0.0.1:3000` (not localhost).

### Production Build

```bash
npm run build
```

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_SPOTIFY_CLIENT_ID` | Your Spotify app client ID |
| `REACT_APP_REDIRECT_URI` | OAuth callback URL |

## ⚠️ Access Restrictions

Taste Test is currently operating under Spotify's development mode, which restricts API access to a maximum of 5 allowlisted users. This is a Spotify platform limitation — not a limitation of the app itself. An extended quota request has been submitted to Spotify to unlock unlimited user access, and approval is currently pending. Once approved, Taste Test will be open to everyone with no restrictions.

In the meantime, if you'd like to be added to the allowlist, email **danieldeda165@gmail.com** with your Spotify account email. Spots are extremely limited.

## 📝 Note on AI Accuracy

Since question generation is powered by GPT-4, not all answers will be 100% accurate. AI knowledge has limitations, particularly for lesser-known or foreign artists. The game experience is designed to be fun and educational rather than a definitive source of truth.

## 👨‍💻 Developer

**Daniel Deda**
- Portfolio: [dedabase.me](https://dedabase.me)
- Email: danieldeda165@gmail.com

---

⭐ Star this repo if you enjoy the app!
