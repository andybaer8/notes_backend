_ = require('underscore');
module.exports = {
    postReqData: function(req, callback) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            callback(body);
        });
    },
    methodListing: [{

            name: 'deleteall',
            method: 'GET',
            helpMsg: "Deletes all notes from the server",
            serverFunction: function(req, res) {
                db.collection('notes').deleteMany({}, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        console.log('All notes deleted');
                        res.send("All notes deleted");
                    }

                })
            },
            browserCallback: function(res) {

            }
        },

        {

            name: "readall",
            method: "GET",
            helpMsg: "Reads all notes currently on the server",
            serverFunction: function(req, res) {
                db.collection('notes').find().toArray(function(err, explain) {
                   
                    var list = "";
                    _.each(explain, function(item) {
                    	list += (JSON.stringify(item) + "\n");
                    })
                    res.send(list);
                     console.log('All notes read');
                })
            },
            browserCallback: function(res) {

            }
        },

        {

            name: "postnote",
            method: "POST",
            helpMsg: "Posts a new note to the server. Usage: postnote_title_body",
            serverFunction: function(req, res) {
                console.log("We are in postnote server op");
                reqUtils.postReqData(req, function(body) {
                    console.log(body);
                    var body = JSON.parse(body);
                    const note = { body: body.body, title: body.title };
                    db.collection('notes').insert(note, (err, result) => {
                        if (err) {
                            res.send({ 'error': 'An error has occurred' });
                        } else {
                            res.send("Note successfully added: " + note);
                        }
                    });
                })


            },
            browserCallback: function(res) {

            }
        },
        {
            name: 'edit',
            method: 'POST',
            helpMsg: 'Edits the body of a note on the server. Usage: edit_(title of note to edit)_(new body of note)',
            serverFunction: function(req, res) {
                reqUtils.postReqData(req, function(body) {
                    body = JSON.parse(body);
                    const note = {$set:{ body: body.body, title: body.title }};
                    db.collection('notes').updateMany( {title: body.title} , note, {upsert:true}, function(err, explain) {
                        if (err) {
                            res.send(JSON.stringify(err));
                        } else {
                            res.send("Note successfully modified" + JSON.stringify(note));
                        }
                    })
                })
            },
            browserCallback: function(res) {}
        }

    ]
}