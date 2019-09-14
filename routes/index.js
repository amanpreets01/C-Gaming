var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('Value'+req.session.email);
	if(req.session.email != null){
		authenticated = true
	}
	else{
		authenticated = false
	}
	res.render('index.hbs', {title: 'C-Gaming'});
});


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

module.exports = router;
