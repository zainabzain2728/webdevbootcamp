var express 		= require("express"),
 	app 			= express(),
 	bodyParser 		= require("body-parser"),
 	mongoose 		= require("mongoose"),
	flash			= require("connect-flash"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground 		= require("./models/campground"),
	Comment			= require("./models/comment"),
	User			= require("./models/user"),
	seedDB			= require("./seeds")

//require routes
var	commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes		 = require("./routes/index")


// mongoose.connect(("mongodb://localhost/yelp_camp"),{
mongoose.connect(("mongodb+srv://zainabzain:zainizain2728@yelpcamp.cah9v.mongodb.net/yelpcamp?retryWrites=true&w=majority"),{
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology : true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB(); //seed the datadbase

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Roses are the best flower in the whole world",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3001, process.env.IP, function() {
  console.log("yelp camp server start");
});
