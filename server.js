
var http = require('http');
var fs = require('fs');
var querystring=require('querystring');
var handlers=require('./src/handlers.js')

var message = "This is a message. #nodegirlsldn rocks!";

var server = http.createServer(handlers);

server.listen(3000,function(){
	console.log("Server is listening on port 3000. Ready to accept requests");
});

