
var express = require('express');
var router = express.Router();
var Form = require('./../models/form');
var NUserSchema = require('./../models/new_user');
var mongo_url = require('./../db/mongo_connection.js');
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const url = require('url');
var crypto = require('crypto');
var session;
var robot = require('robotjs');
all_games = [];
purchased = [];

var iohook = require('iohook');

//Keylogging settings

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users.hbs');
});

router.post('/login' , (req,res,next)=>{
	var det = new Form({
		email : req.body.email,
		password : req.body.password
	});
	 MongoClient.connect(mongo_url , (err,client) => {
	 	
	 	client.db(process.env.DB).collection("register").findOne({'email_add':det.email})
	 	.then((doc) => {
			if(doc.password == det.password){
				console.log(doc);
				session = req.session;
				session.email = det.email;
				session.password = det.password;
				var user_id = det.email+det.password;
				var hash = crypto.createHash('sha256').update(user_id).digest('base64')
				hash = hash.split('/')[0];
				session.user_id = hash;
				return res.redirect('/user/games/'+hash);
				next();
				}
			else{
				res.redirect('/');
			}
		}).catch((err) => {
			console.log(err);
		});
		})
	}); 

router.post('/signup' , (req , res) => {
	
	var det = new NUserSchema({
		_id : mongoose.Types.ObjectId(),
		username : req.body.username , 
		password : req.body.password,
		phone_no : req.body.phone_no , 
		email_add : req.body.reg_email
	});	
	console.log(mongo_url);
	MongoClient.connect(mongo_url , (err , client) => {
		
		client.db('user').collection("register").insertOne(det)
		.then((det) => {
			console.log("Saved");
			res.render('index');
		}).catch(err => console.log(err));
	});

});
router.get('/games/:user_id' , (req , res , next) => {
		console.log(authenticated , req.session.email)
		if(req.session.email != null){
			authenticated = true;
		}
		console.log(authenticated);
		MongoClient.connect(mongo_url , (err, client) => {
		console.log(req.session.email);
		client.db('games').collection('all_games').find({}).toArray(function(err, doc) {
			console.log(doc);

			for(var i = 0 ; i < doc.length	 ; i++){
				
				all_games.push(doc[i].name);
			}
			});
		client.db('games').collection('user_games').find({'email' : req.session.email}).toArray(function(err, doc) {
			console.log(doc);

			for(var i = 0 ; i < doc.length	 ; i++){
				purchased.push(doc[i].game);
			}
			console.log(purchased)
			for(var i = 0 ; i < purchased.length ; i++){
				for ( var  j = 0 ; j < all_games.length ; j++){
					if (purchased[i].localeCompare(all_games[j]) == 0){

						var index = all_games.indexOf(all_games[j]);
						if (index > -1) {
						  all_games.splice(index, 1);
						}
					}
				}
			}
			user_id = req.params.user_id;
			console.log('user on preb page' , user_id);
			console.log(all_games);
			res.render('games' , {all_games , purchased , authenticated , user_id : [user_id]});

			all_games = [];
			purchased = [];
			});
		});
});


router.get('/games/:user_id/play' , (req , res) => {

	
/*
	iohook.on("keydown", e => {
  console.log(e.rawcode, String.fromCharCode(e.rawcode));
});


	iohook.on('mousemove', event => {
  console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});



	iohook.start();
	res.render('test');
*/

//res.render('test');
res.redirect('http://192.168.0.108:8000/')

});


module.exports = router;