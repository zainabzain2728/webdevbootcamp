var bodyParser 	= require("body-parser"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	mongoose 	= require("mongoose"),
	express 	= require ("express"),
	app 		= express();

mongoose.connect(("mongodb://localhost/restful_blog_app"),{
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology : true,
	useFindAndModify: false
});

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//mongoose/model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Restfull routes
//Index
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error!!!!");
		} else{
			res.render("index", {blogs: blogs});
		}
	});
});

//NEW Route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
	//craete blogs
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("/new");
		}else{
			res.redirect("/blogs");
		}
	});
});

//SHOW Route
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog: foundBlog});
		}
	});
});


//EDIT Route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog: foundBlog});
		}
	});  
});

//UPDATE Route
app.put("/blogs/:id",function(req, res){
		req.body.blog.body = req.sanitize(req.body.blog.body);
		Blog.findOneAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});


//DELETE Route

app.delete("/blogs/:id", function(req, res){
	Blog.findOneAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs");
		}
	}); 
});


app.listen(process.env.PORT||3000 , process.env.IP, function(){
	console.log("server started");
})