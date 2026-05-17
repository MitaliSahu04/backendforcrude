const express = require("express");

const cors = require("cors");

const path = require("path");

const authRoutes = require(
  "./routes/authRoutes"
);

const productRoutes = require(
  "./routes/productRoutes"
);

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://YOUR-FRONTEND.vercel.app",
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

app.use("/api/auth", authRoutes);

app.use(
  "/api/products",
  productRoutes
);

module.exports = app;