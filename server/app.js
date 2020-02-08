const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

let callCount = 0;

app.use(cors());

app.get("/notify", function(req, res) {
  console.log(req.query);
  callCount++;
  console.log("triggered", callCount);
  res.send(`${callCount}`);
});

app.get("/poll", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.json({ callCount });
});

app.get("/reset", function(req, res) {
  callCount = 0;
  res.json({ callCount });
});

app.listen(port, () =>
  console.log(`Yell at my cat is listening on port ${port}!`)
);
