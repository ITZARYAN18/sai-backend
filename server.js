const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/videos", require("./routes/video"));
app.use("/api/performance", require("./routes/performance"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

// Server start
const PORT = process.env.PORT || 5000;

const mlRoutes = require("./routes/ml");
app.use("/api/ml", mlRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
