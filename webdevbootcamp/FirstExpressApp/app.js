var express = require("express");
var app = express();

// "/" =>"hi there"

app.get("/", function(req, res) {
  res.send("Hi there!");
});

// "/bye" => "good bye"
app.get("/bye", function(req, res) {
  res.send("goodbye");
});
// "/dog" => "mewo"

app.get("/dog", function(req, res) {
  res.send("meow");
});

app.get("/r/:subredditName", function(req, res) {
  var subreddit = req.params.subredditName;
  res.send("Welcome to " + subreddit.toUpperCase() + " subredditname");
});

app.get("*", function(req, res) {
  res.send("you are a star");
});

//tell express to listenfor request(start server)
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server started");
});
