const mongoose = require('mongoose');

const NUserSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	username:{
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	},
	phone_no : {
		type : Number,
		required : true
	},
	email_add : {
		type : String , 
		required : true
	}

});

module.exports = mongoose.model('NUser',NUserSchema);