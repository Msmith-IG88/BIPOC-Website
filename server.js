

var bodyParser=require('body-parser');
var path= require('path');
var MongoClient = require('mongodb').MongoClient;
var express=require('express');
var exphbs=require('express-handlebars');
var app=express();
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine','handlebars');

//lets app handles server requests from client side



app.use(bodyParser.json());
app.use(express.static('public'));
//pieces of url for database
//var mongoHost= process.env.MONGO_HOST;
//var mongoPort = process.env.MONGO_PORT || 27017;
//var mongoUser= process.env.MONGO_USER;
//var mongoPassword= process.env.MONGO_PASSWORD;
//var mongoDBName = process.env.MONGO_DB_NAME;

var mongoHost= 'cluster0.jzqjg.mongodb.net';
var mongoPort = 27017;
var mongoUser= 'team-28';
var mongoPassword= 'Final-Project';
var mongoDBName = 'project';
//url for databse
var mongoURL= 'mongodb+srv://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + '/' + mongoDBName;

var mongoDBDatabase;

//starts server after succesfull connection
MongoClient.connect(mongoURL, function(err,client){
	if(err){
		throw err;}
	db=mongoDBDatabase = client.db(mongoDBName);
	app.listen(3000,function(){
		console.log("==Server listening on port 3000");});
	
});
//the list of posts are stored in a collection (basically a type of array that Mongo uses)
//people is the name of the collection for the posts on the home page
//community is the name of the collection for the posts on the community page




//find filters a collection based on what's in {} when empty it returns all posts


var taglist=[
	{tag: "Instagram"},
	{tag: "YouTuber"},
	{tag: "Entrepeneur"},
	{tag: "Historical"},
	{tag: "Educator"},
	{tag: "Professional"},
	{tag: "Leader"},
	{tag: "STEMAdvocate"},
	{tag: "[Delete]"}
];


app.get('/',function(req,res,next){ 
	//converts peopleCursor to an array called peopledocs
	var people = db.collection('people');
	var peopleCursor = people.find({});
	

	peopleCursor.toArray(function(err,peopleDocs){
		if(err){
			res.status(500).send("Error fetching people from DB.");}
		else{
		
		//render page using peopleDocs( an Array of posts found by peopleCursor)
			res.render('homePage',{
				postCards:peopleDocs,
				layout: 'home',
				tags: taglist
		});


		}

	});
});

app.get('/About',function(req,res,next){
	var about=db.collection('team');
	var aboutCursor=about.find({});
	aboutCursor.toArray(function(err,aboutDocs){
		if(err){
			res.status(500).send("Error fetching about from DB.");}
		else{

		//render About page
			res.render('aboutPage',{
				person:aboutDocs,
				layout:'about'
			});

		}
	});

});

app.get('/Community', function(req,res,next){
	//convers communityCursor to an array called communitydocs
	var community=db.collection('community');
	var communityCursor=community.find({});

	communityCursor.toArray(function(err,communityDocs){
		if(err){
			res.status(500).send("Error fetching community from DB.");}
		else{

		//render page using communityDocs
			res.render('comPage',{
				posts:communityDocs,
				layout: 'com'
			});


		}

	});	
});


//req.body is how to get the arguments passed by request.send in Home.js
app.post('/',function(req,res,next){
	var peoplePost=db.collection('people');
	var peoplePostCursor=peoplePost.find({name: req.body.name});
	peoplePostCursor.toArray(function(err,peopleDocs){
		if(err){
			res.status(500).send("Error fetching people from DB.");}
		else{
			if(req.body.update=='N'){
				peoplePost.insertOne({
					name: req.body.name,
					bio: req.body.bio,
					imgURL: req.body.imgURL,
					role: req.body.role,
					tag: req.body.tag,
					platformURL: req.body.platformURL
				});
			}
			else{
				peoplePost.updateOne(
					{name: req.body.name},
					{$set: {
						name: req.body.name,
						bio: req.body.bio,
						imgURL: req.body.imgURL,
						role: req.body.role,
						tag: req.body.tag,
						platformURL: req.body.platformURL
						}} 
				);

			}
		}

	});
	
});
	




app.delete('/',function(req,res,next){
	var peopleDel=db.collection('people');
	var peopleDelCursor=peopleDel.find({name: req.body.name});
	peopleDelCursor.toArray(function(err,peopleDocs){
		if(err){
			res.status(500).send("Error fetching community from DB.");}
		else{
			peopleDel.deleteOne({name: req.body.name});
		}
	
	});
});	



app.post('/Community',function(req,res,next){
	var commPost=db.collection('community');
	var commPostCursor=commPost.find({postName: req.body.postName});
	commPostCursor.toArray(function(err,commDocs){
		if(err){
			res.status(500).send("Error fetching people from DB.");}
		else{
			
			commPost.insertOne({
				postName: req.body.postName,
				postType: req.body.postType,
				postSummary: req.body.postSummary,
				resourceURL: req.body.resourceURL
			});
			
		}

	});
	
});
	


