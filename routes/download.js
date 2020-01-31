var express = require('express');
var router = express.Router();

//connection 
var mongo_url = require('./../db/mongo_connection.js');
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

router.get('/' , (req , res , next) => {
	authenticated = false;
	console.log(req.session.email);
	if(req.session.email != null){
		authenticated = true;
	}

	//download file on client
	if(authenticated){
		var file = __dirname + './../client.py';
		return res.download(file);
	}
	else{
		res.redirect('/')
	}
});

module.exports = router;