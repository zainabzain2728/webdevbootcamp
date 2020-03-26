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

//tell express to listenfor request(start server)
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server started");
});
