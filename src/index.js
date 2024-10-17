const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple route to test the server
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
