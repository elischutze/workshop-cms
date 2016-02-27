
var http = require('http');
var fs = require('fs');

var message = "This is a message. #nodegirlsldn rocks!";

function handler (request,response) {
	

	var method = request.method;
	console.log(method);

	var endpoint = request.url;
	console.log(endpoint);
	// var type = endpoint[:-3];
	// console.log("Req: "+JSON.stringify(request));

	if (endpoint==="/"){
		response.writeHead(200, {"Content-Type":"text/html"});

		fs.readFile(__dirname+'/public/index.html', function(error,file){
			if (error) {
				console.log(error);
				return;
			}
			response.end(file); 
		});

	}

	else if(endpoint==="/node"){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("this is node!!");
		response.end();
	} else if (endpoint==="/girls"){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("this is girls!!!");
		response.end();
	}else {
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

