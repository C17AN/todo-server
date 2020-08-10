const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const MongoClient = require("mongodb").MongoClient;

let tasks = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log(`listening on port 5000`);
  MongoClient.connect(
    // 몽고디비와 연결, connect 함수는 프로미스로 사용 가능
    "mongodb+srv://spacesangsoo:recharge1@cluster0.9nkya.mongodb.net/task_database?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected to database");
      const db = client.db("task_database");
      const taskCollection = db.collection("task");
      (async () => {
        // console.log("Foreach");
        // await taskCollection.find().forEach((el) => console.log(el.title));
        tasks = await taskCollection
          .find()
          .toArray()
          .then((data) => {
            return data;
          });
        // tasks = await taskCollection.find().map((data) => {
        //   return data;
        // });
      })();

      // insertOne 메서드는 디비 컬렉션에 추가함
      app.post("/", function (req, res) {
        taskCollection.insertOne(req.body);
        const task = req.body;
        tasks = [...tasks, task];
        res.send(tasks);
      });
      // 태스크 삭제
      app.delete("/", function (req, res) {
        const targetId = req.body.targetId;
        tasks = tasks.filter((el) => el.index !== targetId);
        taskCollection.deleteOne({ index: targetId });
        res.send(tasks);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/", function (req, res) {
  res.send(tasks);
});
