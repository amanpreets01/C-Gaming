var express = require('express');
var router = express.Router();
var mongo_url = require('./../db/mongo_connection');
var MongoClient = require('mongodb').MongoClient;
var session;

router.get('/:game_name' , (req , res) => {
	game_name = decodeURI(req.params.game_name);
	if(req.session.user_id == null){
		res.redirect('/')
	}
	else{
		MongoClient.connect(mongo_url , (err , client) => {
			console.log('GAme'+game_name);
			
			client.db('games').collection('user_games').insert({
				'email' : req.session.email,
				'game' : game_name
				}).then((doc) => {
					console.log('Saved successful');
					return res.redirect('/user/games/'+req.session.user_id);
				}).catch(err => console.log(err));
		});



	}
});

module.exports = router;