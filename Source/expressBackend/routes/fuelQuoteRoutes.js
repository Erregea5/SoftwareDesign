const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // Call the calculateFuelQuote function
  // ...
});

router.get("/history", (req, res) => {
  console.log("works");
  // Call the getFuelQuoteHistory function
  // ...
});

module.exports = router;
