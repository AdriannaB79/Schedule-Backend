const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// Connect with DB
mongoose
  .connect("mongodb://localhost:27017/nurse-schedule", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(cors());
app.use(bodyParser.json());

// use routers
app.use("/api", user);

// Server run
app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
