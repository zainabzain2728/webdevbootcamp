var express  				= require("express"),
	app 	 				= express(),
	mongoose 				= require("mongoose"),
	passport 				= require("passport"),
	bodyParser 				= require("body-parser"),
	User					= require("./models/user"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose");

mongoose.connect(("mongodb://localhost/auth_demo_app"),{
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology : true
});
	
app.use(require("express-session")({
	secret: "rose is the most beautiful flower in th world",
	resave:false,
	saveUninitialized:false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================
//	ROUTES
// ================

app.get("/", function(req, res){
	res.render("home");
});


//Secret route
app.get("/secret", isLoogedIn, function(req, res){
	res.render("secret");
});

//AUTH Routes

//Show sign up form
app.get("/register", function(req, res){
	res.render("register");
});

//handling user sign up
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password,function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});


//Login Routes
//render login form
app.get("/login", function(req, res){
	res.render("login");
});

//login logic
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
	
});


//logout Route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// middleware
function isLoogedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(process.env.PORT || 3001, process.env.IP, function(){
	console.log("server started........")
})