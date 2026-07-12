# InvestAI – AI-Powered Investment Research Platform

## Overview

InvestAI is a full-stack AI-powered investment research platform that generates comprehensive investment reports for publicly listed companies. It combines real-time financial data, the latest market news, and Google Gemini AI to provide Buy/Hold/Sell recommendations, SWOT analysis, valuation insights, risk assessment, and detailed investment reports through an interactive dashboard.


## Features

- AI-powered investment research reports
- Company financial analysis using Finnhub API
- Latest company news using Tavily API
- Buy / Hold / Sell recommendation
- SWOT analysis and risk assessment
- JWT Authentication
- Google OAuth Login
- Responsive React dashboard

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- LangChain.js
- Passport.js
- JWT Authentication

### APIs
- Google Gemini API
- Finnhub API
- Tavily API



## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekyadav620/Investment-analyzer
cd IIM_ASSIGNMENT
```

### 2. Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the **backend** folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FINNHUB_API_KEY=your_finnhub_api_key
TAVILY_API_KEY=your_tavily_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file inside the **frontend** folder with:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the Project

Backend

```bash
npm start
```

Frontend

```bash
npm run dev
```




## How it Works

### Architecture

```
                User
                  │
                  ▼
        React Frontend (Vite)
                  │
                  ▼
      Express.js Backend (Node.js)
                  │
                  ▼
      JWT Authentication & Validation
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Finnhub API          Tavily API
(Financial Data)     (Latest News)
        └─────────┬─────────┘
                  ▼
          LangChain + Gemini AI
                  │
                  ▼
      AI Investment Research Report
                  │
                  ▼
       Interactive React Dashboard
```

### Workflow

1. User logs into the application using JWT Authentication or Google OAuth.
2. User searches for a publicly listed company.
3. Backend fetches financial fundamentals from the Finnhub API.
4. Backend retrieves the latest company news using the Tavily API.
5. LangChain combines the financial data and news into a structured prompt.
6. Google Gemini generates an AI-powered investment analysis.
7. The backend formats the response and sends it to the frontend.
8. The frontend displays the investment report with recommendation, SWOT analysis, risks, strengths, valuation, and confidence score.


## Key Decisions & Trade-offs

### Key Decisions

- Used **Google Gemini** as the Large Language Model (LLM) for generating comprehensive investment research reports due to its strong reasoning and summarization capabilities.
- Integrated **Finnhub API** to fetch structured financial fundamentals and **Tavily API** to retrieve the latest company news, ensuring that recommendations are based on both financial metrics and recent market developments.
- Implemented **JWT Authentication** and **Google OAuth** to secure the application and restrict AI-powered analysis to authenticated users.

### Trade-offs

- Portfolio management and watchlist features were not implemented to keep the project focused on AI-powered investment research.
- Historical stock charts and advanced financial visualizations were left out due to the assignment timeline.
- Report caching and advanced rate limiting were identified as future improvements but were not implemented in the current version.