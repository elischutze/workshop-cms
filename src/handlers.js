var http=require('http');
var fs=require('fs');
var path=require('path');



function handler(request,response){
	var endpoint=request.url;
	switch (endpoint){
		case "/":
		response.writeHead(200, {"Content-Type":"text/html"});

		fs.readFile(path.resolve(__dirname,'../public/index.html'), function(error,file){
			if (error) {
				console.log(error);
				return;
			}
			response.end(file); 
		});
		break;

		default:
		fs.readFile(path.resolve(__dirname,'../public'+endpoint), function(error,file){
				if (error) {
					console.log(error);
					return;
				}
				response.end(file);
			});
		break;

	}

}


module.exports=handler;