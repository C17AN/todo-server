const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const tasks = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://spacesangsoo:recharge1@cluster0.9nkya.mongodb.net/task_database?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("task_database");
    const task = db.collection("task");
    // insertOne 메서드는 디비 컬렉션에 추가함
    app.post("/", function (req, res) {
      task.insertOne(req.body);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", function (req, res) {
  res.end(tasks);
});

app.delete("/delete", function (req, res) {
  res.end(tasks);
});

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
