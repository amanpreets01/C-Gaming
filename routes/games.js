var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongo_url = require('./../db/mongo_connection');
var sess;

purchased = [];
all_games = [];


router.get('/' , (req , res , next) => {
		
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

			console.log(all_games);

			res.render('games' , {all_games : all_games , 
								purchased : purchased , 
								authenticated : authenticated});
			
			});
		});
});

module.exports = router;