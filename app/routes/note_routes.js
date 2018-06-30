reqUtils = require('../utils/reqUtils.js');
module.exports = function(app, db) {
app.get('/deleteall', (req,res) => {
	db.collection('notes').deleteMany({},(err,result) => {
		if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
      	console.log('All notes deleted');
        res.send(result);
      }
		
	})
})
app.get('/readall', (req,res) => {
db.collection('notes').find().toArray(function(err, explain) {
	console.log('All notes read');
	res.send(explain);
})
});
  app.post('/postnote', (req, res) => {
  	console.log("We are in postnote server op");
   reqUtils.postReqData(req, function(body) {
     console.log(body);
        body = JSON.parse(body);
        const note = { body: body.body, title: body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
   })
     
    
  });
};