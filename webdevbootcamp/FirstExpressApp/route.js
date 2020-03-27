var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:petname", function(req, res) {
  var sounds = {
    pig: "oink",
    cow: "Moo",
    dog: "woof",
    cat: "meow"
  };
  var name = req.params.petname.toLowerCase();
  var sound = sounds[name];
  // if (name === "pig") {
  //   sound = "oink";
  // } else if (name === "cow") {
  //   sound = "Moo";
  // } else if (name === "dog") {
  //   sound = "woof woof!";
  // }
  res.send("The " + name + " says " + sound + ".");
});

app.get("/repeat/:word/:num", function(req, res) {
  var word = req.params.word;
  var num = Number(req.params.num);
  var result = "";
  for (var i = 0; i < num; i++) {
    result += word + " ";
  }
  res.send(result);
});

//tell express to listenfor request(start server)
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server started");
});
