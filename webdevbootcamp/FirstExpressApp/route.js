var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment");
});

app.get("/r/:subredditName", function(req, res) {
  var name = req.params.subredditName;
  var sound = "";
  if (name === "pig") {
    res.send(sound === "oink");
  } else if (name === "cow") {
    res.send(sound === "Moo");
  } else if (name === "dog") {
    res.send(sound === "woof woof!");
  } else {
    res.send(" please select Pig cow Or dog");
  }
  res.send("The " + name + "says " + sound + ".");
});

//tell express to listenfor request(start server)
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server started");
});
