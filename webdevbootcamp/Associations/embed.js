var mongoose = require ("mongoose");
mongoose.connect(('mongodb://localhost/blog_demo'),{
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology : true,
	useFindAndModify: false
});

//POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

//USER -email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts : [postSchema]
});
var User = mongoose.model("User", userSchema);




// var newUser = new User({
// 	email: "hermione@hogward.edu",
// 	name: "Hermione Granger"
// });

// newUser.posts.push({
// 	title:"how to bre polyjuice poyion",
// 	content: "just kiding. Go to potion class to learn it!"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflection on Apples",
// 	content: "They are delicious"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name:"Hermione Granger"}, function(err, user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title: "3 thing i realy hate",
			content: " voldemort. voldemort. voldemort"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});



