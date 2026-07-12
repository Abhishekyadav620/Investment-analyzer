/**

 * server.js

 *

 * Entry point for the InvestAI backend.

 * Initializes Express, middleware, routes, and starts the HTTP server.

 *

 * Future phases will register additional routes and services here.

 */



require("dotenv").config();



const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");



const analyzeRoutes = require("./routes/analyzeRoutes");

const authRoutes = require("./routes/authRoutes");



const app = express();



const PORT = process.env.PORT || 5000;



// ── Database Connection ──────────────────────────────────────────────────────

mongoose

  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log("MongoDB Atlas connected to Invest_db successfully");

  })

  .catch((err) => {

    console.error("MongoDB connection failed:", err.message);

  });



// ── Middleware ──────────────────────────────────────────────────────────────

app.use(cors());

app.use(express.json());



// ── Routes ──────────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);

app.use("/api", analyzeRoutes);



// ── Health check ────────────────────────────────────────────────────────────

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "InvestAI Backend API is running",

  });

});



// ── 404 handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route not found",

  });

});



// ── Global error handler ─────────────────────────────────────────────────────

app.use((err, req, res, next) => {

  console.error("Unhandled error:", err.message);

  res.status(500).json({

    success: false,

    message: "Internal server error",

  });

});



// ── Start server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {

  console.log(`InvestAI Backend running on http://localhost:${PORT}`);

});

