require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const loginRoutes = require("./routes/loginRoutes.js");
const registrationRoutes = require("./routes/registrationRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const fuelQuoteRoutes = require("./routes/fuelQuoteRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/login", loginRoutes);
app.use("/register", registrationRoutes);
app.use("/profile", profileRoutes);
app.use("/fuel-quote", fuelQuoteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
