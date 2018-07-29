# LIRI BOT

 

Descripttion: 
	LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
	LIRI will display the latest tweets, movies details, song/album/artist details.
	The data collected from the server will also be stored in a file called log.txt.

Technologies Used: 
	Language: JavaScript.

	Environment: Node JS.

	API: Twitter API and Spotify API.

	Library: request, dotenv.

	File system.

Method: 

	Created an account in twitter and spotify to get the required api keys and security keys. 
	For movies used the OMDB api key. 

	Using the javascript language and node js environment created  liri.js file where the script is written to retrieve data .

	Twitter:
		 For the twitter account 20 latest tweets is displayed when in the  command line 
		 "node liri.js my-tweets <tweetusername>" 
		 is entered.
		 If no tweetusername is provided then by default "cnn" latest tweets will be displayed.
		 The information will be displayed in the follwing order: 
		 	1-The twitter screen name
		 	2-Tweet text
		 	3-Tweet created on

	Spotify:
		For the spotify it will display the details of song/track entered. 
		In the command line 
		"node liri.js spotify-this-song <song/track>"
		is entered.
		If "node liri.js spotify-this-song" is entered without the song/track name, then by default "i want it that way" from millennium album by backstreet boys will be displayed.
		The information will be displayed in the follwing order: 
			1-Artist(s) Name:
			2-The song's name:
			3-A preview link of the song from Spotify:
			4- The album that the song is from:


	OMDB:
		For the omdb it will display the movie details which is entered in the command line. In the command line 
		"node liri.js movie-this <movie name>" 
		is entered.
		If "node liri.js movie-this" is entered without a movie name, then by default "Mr. Nobody" movie detail will be displayed.
		The information will be displayed in the following order: 
			1-Title of the movie:
			2-Year the movie came out:
			3-IMDB Rating of the movie:
			4-Rotten Tomatoes Rating of the movie:
			5-Country where the movie was produced:
			6-Language of the movie:
			7-Plot of the movie: 
			8-Actors in the movie:

	Do-What-It-Says:
		Here the file system(fs) reads the content in the random.txt file (which is a song), and displays the detail of the song using the spotify function. Basically the spotify function is called here.

	Installation:
		Before running the app in the command line we need to install the following npm packages:
			request:  npm install request
			twitter : npm install twitter
			spotify:  npm install spotify
			Keys:     npm install keys
			dotenv:   npm install .env

		Initializing the package.json
			node init


	Command in command line:
	Twitter: node <"js file name"> my-tweets <"username"> 
	Spotify: node <"js file name"> sporify-this-song <"song name">
	OMDB:    node <"js file name"> movie-this <"movie name">
	do:      node <"js file name"> do-what-it-says			












    