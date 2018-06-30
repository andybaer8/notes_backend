var request = require('request');
var http = require("http");
var querystring = require('querystring');
const config = require('../config/config');
shortReq = function(/*Takes an arguments object
                    nost, port, path, method, body, callback*/) {
     var post_data = querystring.stringify(arguments.body);

     var post_options = {
      host: arguments.host || 'http://localhost',
      port: arguments.port || '8000',
      path: arguments.path || "",
      method: arguments.method || "GET",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          arguments.callback(chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}


var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Enter a backend command, or \"q\" to quit\t');
rl.prompt();
rl.on('line', function(line) {
	debugger;
	line = line.trim().split(/[_]+/);
	var command = line[0];
	
	if (command === "q") rl.close();
    if (command === "deleteall") {
       http.get({
        host: config.host,
        port: config.port,
        path: '/'+command
       }, function(res) {
        console.log('All notes deleted');
       })
    }
    if (command === "postnote") {
    	var reqBody = JSON.stringify({
    		
	    		title: line[1],
	    		body: line[2]

    	});
            var postheaders = {
                'Content-Type' : 'application/json',
                'Content-Length' : Buffer.byteLength(reqBody, 'utf8')
            };

          var req = http.request({
            host: config.host,
            port: config.port,
            method: 'POST',
            path: '/'+command,
           }, function(res) {
            console.log(res.statusCode)
            res.on('data', function(d) {
                console.log(d.toString());
            })
           });
          req.write(reqBody);
          req.end();
        
       
    	}
 	if (command === "readall") {
 		var req = http.request({
 		hostname: "localhost",
		port:"8000",
		path:"/readall",
		method:"GET"
 		}, (res) => {
 			res.on('data', (chunk) => {
 				console.log(chunk.toString());
 			})
 		})
 		req.on('error', (e) => {

 			console.log("error encountered");
 		})
 		req.end();
    }
    rl.prompt();
}).on('close',function(){
    process.exit(0);
});