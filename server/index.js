const express = require("express");
const cors = require("cors");
const app = express();

const tasks = [];

app.use(cors());

app.get("/", function (req, res) {
  res.end(tasks);
});

app.post("/add", function (req, res) {
  res.end(tasks);
});

app.delete("/delete", function (req, res) {
  res.end(tasks);
});

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
