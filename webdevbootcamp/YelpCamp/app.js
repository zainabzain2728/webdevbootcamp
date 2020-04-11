var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(("mongodb://localhost/yelp_camp"),{
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology : true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//schema setup

var campgroundSchema = new mongoose.Schema({
	name : String,
	image : String,
	description: String
});


var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
// {
// 	name: "zain",
//     image:
//       "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg",
// 	description: "this isthe awesom place here fresh air "
// }, function(err, campground){
// 	if (err){
// 		console.log(err);
// 	}else{
// 		console.log("newly created campground: ");
// 		console.log(campground);
// 	}
// });


app.get("/", function(req, res) {
  res.render("landing");
});

//Index- all campgrounda
app.get("/campgrounds", function(req, res) {
	//get all campgrounds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index", { campgrounds: allCampgrounds });
		}
	});
});

//Create-  create new campgrounds
app.post("/campgrounds", function(req, res) {
  //get data from formandadd to the array
  var name = req.body.name;
  var image = req.body.image;
	var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  //craete a new campground and save in DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to the campgrounds page
  			res.redirect("/campgrounds");
		}
	});
});

//New- add new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//Show- show info aboout one campgrounds
app.get("/campgrounds/:id", function(req,res){
	//find campground against Id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			//show the description
	res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(process.env.PORT || 3001, process.env.IP, function() {
  console.log("yelp camp server start");
});
