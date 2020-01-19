var io = require('socket.io');
var express = require('express');

var router = express.Router();

var socket = io();

socket.on('connection' , () => {
	console.log('A user connected');
	socket.on('disconnect' , () =>{
		console.log('User disconnected');

	});
});







