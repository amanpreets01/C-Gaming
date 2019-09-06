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

router.get('/games/:user_id' , (req , res) => {
	console.log(session.user_id);
	if(session.user_id == ''){
		return res.redirect('/');
	}
	else{
		user_id = req.params.user_id;
		MongoClient.connect(mongo_url ,(err , client) => {
			client.db('games').collection('user_games').findOne({user_id})
			.then((doc) => {
				if(doc == null){
					res.render('games' , {'self_games' : 'Empty . Purchase some to play some'})
				}
				else{
					console.log(doc);
					res.render('games' , {'self_games' : doc.games});
				}
			})
			.catch(err => console.log(err));

		});
	}

});

module.exports = router;
