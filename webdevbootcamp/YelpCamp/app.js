var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://zainab:Zainizain%402728@cluster0-kdtti.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("connected to DB!!");
  })
  .catch(err => {
    console.log("error:", err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var campgrounds = [
  {
    name: "zain",
    image:
      "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg"
  },
  {
    name: "zaini",
    image:
      "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061__340.jpg"
  },
  {
    name: "tasmia",
    image:
      "https://cdn.pixabay.com/photo/2016/05/25/08/13/shelter-1414170__340.jpg"
  },
  {
    name: "zain",
    image:
      "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg"
  },
  {
    name: "zaini",
    image:
      "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061__340.jpg"
  },
  {
    name: "tasmia",
    image:
      "https://cdn.pixabay.com/photo/2016/05/25/08/13/shelter-1414170__340.jpg"
  },
  {
    name: "zain",
    image:
      "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg"
  },
  {
    name: "zaini",
    image:
      "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061__340.jpg"
  },
  {
    name: "tasmia",
    image:
      "https://cdn.pixabay.com/photo/2016/05/25/08/13/shelter-1414170__340.jpg"
  }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  //get data from formandadd to the array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  //redirect back to the campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("yelp camp server start");
});
