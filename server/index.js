const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongodb = require("mongodb");

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api/test', async (req, res) => {
    const lessons = await loadLessonsCollection();
    await lessons
      .find({})
      .toArray()
      .then((lesson) => {
        res.send(lesson);
      });
});


app.get('/api/lessons', async (req, res) => {
    const lessons = await loadLessonsCollection();
    await lessons
      .find({})
      .toArray()
      .then((lesson) => {
        res.send(lesson);
      });
});

// Get lessons from mongodb
async function loadLessonsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://admin:FKgp2mjpNEfcdI89@cluster0.crigdy9.mongodb.net",
    {
      useNewUrlParser: true,
    }
  );

  return client.db("school_ums").collection("lesson");
}

app.listen(3000, () => {
    console.log('Express server running on port 3000')
  })