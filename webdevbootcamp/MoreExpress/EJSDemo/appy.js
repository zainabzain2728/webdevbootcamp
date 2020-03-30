var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love", { thingVar: thing });
});

app.get("/posts", function(req, res) {
  var posts = [
    { title: "post 1", auther: "susy" },
    { title: "post 2", auther: "zain" },
    { title: "post 3", auther: "zaini" }
  ];
  res.render("posts", { posts: posts });
});

app.listen(process.env.PORT, process.env.IP, function(req, res) {
  console.log("server started");
});
