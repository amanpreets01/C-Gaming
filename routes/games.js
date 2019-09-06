var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongo_url = require('./../db/mongo_connection');
var sess;
router.get('/' , (req , res , next) => {
		all_games = []
		MongoClient.connect(mongo_url , (err, client) => {

		client.db('games').collection('all_games').find({}).toArray(function(err, doc) {
			console.log(doc);

			for(var i = 0 ; i < doc.length	 ; i++){
				all_games.push(doc[i])
			}
    		res.render('games' , {'all_games' : all_games});
			});
		});
	

		
});


module.exports = router;