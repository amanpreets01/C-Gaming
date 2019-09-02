var express = require('express');
var router = express.Router();
var Form = require('./../models/form');
var NUserSchema = require('./../models/new_user');
var mongo_url = require('./../db/mongo_connection.js');
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const url = require('url');
var sess;

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users.hbs');
});

router.post('/login',(req,res,next)=>{
	var det = new Form({
		email : req.body.email,
		password : req.body.password
	});
	 MongoClient.connect(mongo_url , (err,client) => {
	 	
	 	client.db(process.env.DB).collection("register").findOne({'email_add':det.email})
	 	.then((doc) => {
			if(doc.password == det.password){
				sess = det.email;
				return res.redirect('/user/games');
				next();
				}
			else{
				res.redirect('/user/login');
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

router.get('/games' , (req , res) => {
	console.log(sess);
	res.json('Got');

})

module.exports = router;
