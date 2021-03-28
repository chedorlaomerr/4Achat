const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
const dbURL = `mongodb+srv://jbarry:Bend2002@node-chat-tutorial-clus.fhrzu.mongodb.net/node-chat-tutorial-cluster1?retryWrites=true&w=majority`;

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let Message = mongoose.model("Message", { name: String, message: String });


app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
});

app.post("/messages", (req, res) => {
  let message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

io.on("connection", () => {
  console.log("a user is connected");
});

mongoose.connect(dbURL, (err) => {
  console.log("Mongodb Connected", err);
});

var server = http.listen(8000, () => {
  console.log('server is running on port', server.address().port);
});
