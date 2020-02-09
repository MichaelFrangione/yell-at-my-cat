const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

let callCount = 0;
let isActive = false;

app.use(cors());

app.get("/notify", function(req, res) {
  if (isActive) {
    callCount++;
  }
  res.send(`${callCount}`);
});

app.get("/poll", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.json({ callCount, isActive });
});

app.get("/reset", function(req, res) {
  callCount = 0;
  res.json({ callCount });
});

app.get("/toggle", function(req, res) {
  isActive = !isActive;
  callCount = 0;
  res.json({ callCount, isActive });
});

app.listen(port, () =>
  console.log(`Yell at my cat is listening on port ${port}!`)
);
