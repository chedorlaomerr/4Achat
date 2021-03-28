var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to 4Achat. Please create an account or login.");
});

router.get("/general", (req, res) => {
  res.send("Welcome to the General Chat Room");
});

router.get("/betting", (req, res) => {
  res.send("Welcome to the Betting Chat Room");
});

module.exports = router;
