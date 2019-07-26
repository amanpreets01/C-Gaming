var express = require('express');
var router = express.Router();
var Form = require('./../models/form');
var NUserSchema = require('./../models/new_user');

var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users.hbs');
});

router.post('/dash',(req,res,next)=>{
	var det = new Form({
		email : req.body.email,
		password : req.body.password
	});
	console.log(req.body.email);
	var flag=0;

	 MongoClient.connect(mongo_url , (err,client) => {
	 	client.db(process.env.DB).collection("register").findOne({'email':det.email})
	 	.then((doc) => {
			 mongo_result.email = doc.email;
			 if(doc.password == det.password){
				req.session.user=doc.email;
				email=req.session.user;
				emails=email.substring(0,email.indexOf('@'));
				flag=1;
				}
			else{
				flag=0;
			}
		});
		});
	});

router.post('/signup' , (req , res) => {

	var det = new NUserSchema({
		username : req.body.username , 
		password : req.body.password,
		phone_no : req.body.phone_no , 
		email : req.body.email
	});


});

module.exports = router;
