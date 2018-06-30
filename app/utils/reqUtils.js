module.exports = {
	postReqData:function(req, callback) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
       callback(body);
    });
	}
}