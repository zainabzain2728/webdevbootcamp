var express = require ("express");
var router 	= express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//==================
// campgrounds ROUTES
//===================

//Index- all campgrounda
router.get("/", function(req, res) {
	var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
           }
        });
    } else {
		//get all campgrounds from DB
		Campground.find({},function(err, allCampgrounds){
			if(err){
				// console.log(err);
				req.flash("error", err.message);
			} else{
				res.render("campgrounds/index", { campgrounds: allCampgrounds, noMatch: noMatch});
			}
		});
	}
});


//Create-  create new campgrounds
router.post("/", middleware.isLoggedIn, function(req, res) {
  //get data from formandadd to the array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var location = req.body.location;
  var author = {
		id: req.user._id,
		username: req.user.username
	}

  var newCampground = { name: name, price: price, image: image, description: desc, author: author, location: location};
  //craete a new campground and save in DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			// console.log(err);
			req.flash("error", err.message);
		}else{
			//redirect back to the campgrounds page
  			res.redirect("/campgrounds");
		}
	});
});

//New- add new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//Show- show info aboout one campgrounds
router.get("/:id", function(req,res){
	//find campground against Id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			return res.redirect("back");
		} else{
			//show the description
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});



//Update campground route
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
	//find andupdate the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", err.message);
			res.redirect("/campgrounds");
		} else {
			//redirect show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});
//Delete/ Destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, deleteCampdground){
		if(err){
			req.flash("error", err.message);
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;
	
	
	
	