var request = require('request');
var http = require("http");
var querystring = require('querystring');
_ = require('underscore');
const config = require('../config/config');
var readline = require('readline');
var reqUtils = require('./utils/reqUtils');
var methods = reqUtils.methodListing;


var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Enter a backend command,"h" for help, or \"q\" to quit\t');
rl.prompt();
rl.on('line', function(line) {
	
	line = line.trim().split(/[_]+/);
	var command = line[0];
	if (command === "h") {
        for (var i = 0; i < methods.length; i++) {
            console.log(methods[i].name + ":" + methods[i].helpMsg);
        }
    }
	else if (command === "q") rl.close();
    else {
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
 	

  //  rl.prompt();
}).on('close',function(){
    process.exit(0);
});