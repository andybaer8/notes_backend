Usage: All of the methods are stored and defined in app/utils/reqUtils.
	Each method ovject has a name (also the path by which the method is called),
	An HTTP method,
	A help message (to be displayed when the user types in "h" on the front end),
	A server function (One that is making the calls to MongoDB)
	A browser callback (unused). Currently the front end just displayes whatever is sent back by the server function

config/config.js defines the host, port, and MongoDB url/credentials

From the root directory, run the following in seperate terminal windows:
	node server.js
	node app/frontend.js