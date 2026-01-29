const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js'); // Check filename in routes folder!

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Postman data padhne ke liye zaroori hai

// Routes )
app.use('/api/auth', authRoutes); 

// DB Connection Logic
mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
