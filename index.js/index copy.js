const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// REAL DEVELOPER FIX: Manually pointing to the .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Console log to check if URI is loading (Professional Debugging)
console.log("Checking URI:", process.env.MONGO_URI ? "Found ✅" : "Not Found ❌");

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("❌ Error: MONGO_URI is missing in your .env file!");
} else {
    mongoose.connect(uri)
      .then(() => console.log("✅ Database Connected Successfully!"))
      .catch((err) => console.log("❌ DB Connection Error:", err.message));
}

const PORT = 5000;
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Opps! Server mein kuch gadbad hai." 
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});