
var http = require('http');
var fs = require('fs');
var querystring=require('querystring');

var message = "This is a message. #nodegirlsldn rocks!";

function handler (request,response) {
	

	var method = request.method;
	console.log(method);

	var endpoint = request.url;
	console.log(endpoint);
	// var type = endpoint[:-3];
	// console.log("Req: "+JSON.stringify(request));

	switch (endpoint){
		case "/":
		response.writeHead(200, {"Content-Type":"text/html"});

		fs.readFile(__dirname+'/public/index.html', function(error,file){
			if (error) {
				console.log(error);
				return;
			}
			response.end(file); 
		});
		break;
	

	case "/node":
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("this is node!!");
		response.end();
		break;

	case "/girls":
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("this is girls!!!");
		response.end();
		break;

	case "/create-post":
	var allTheData='';
	request.on('data', function (chunckOfData){
		allTheData+= chunckOfData;
	});
	request.on('end',function(){
		var convertedData=querystring.parse(allTheData);
		console.log(convertedData);
		response.writeHead(303, {"Location": "/"});
		response.end();
	});
	break;

	default:
	//response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile(__dirname+'/public'+endpoint, function(error,file){
				if (error) {
					console.log(error);
					return;
				}
				response.end(file);
			});
	}
}

var server = http.createServer(handler);

server.listen(3000,function(){
	console.log("Server is listening on port 3000. Ready to accept requests");
});

