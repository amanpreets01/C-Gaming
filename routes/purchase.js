var express = require('express');
var router = express.Router();
var session;

router.get('/' , (req , res) => {
	console.log(req.session.user_id);
});

module.exports = router;