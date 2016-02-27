var http=require('http');
var fs=require('fs');
var path=require('path');
var querystring=require('querystring');




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

		case '/create/post':
			response.writeHead(303, {"Location":"/"});
			var dataStream = '';
			request.on('data',function(data){
				dataStream += data;
			});
			request.on('end',function(){
				var parsedData = querystring.parse(dataStream);
				var postsPath = path.resolve(__dirname,"./posts.json");
				var currFile;
				console.log(postsPath);
				fs.exists(postsPath, function(ok){
					if(ok){
						fs.readFile(postsPath,'utf-8',function(error,file){
							if(error){
								console.log(error);
								return;
							}
							// console.log("heeeeeyyy grrrl");

							console.log(file);
							currFile = file.toString();

							var dateNow = Date.now()+"";


							var myObject = JSON.parse(currFile);
							myObject[dateNow]=parsedData.post;
							currFile = JSON.stringify(myObject);

							console.log("After add: "+currFile);


							///WRITE FILE

							fs.writeFile(postsPath, currFile,function(error){
								if(error){
									console.log(error);
									return;
								}
								
				});






						});
				}
					else{
						console.log("file not found");
					}
					
				});
				
				

				
					
				console.log("Blog Post:"+JSON.stringify(parsedData));
				response.end();
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