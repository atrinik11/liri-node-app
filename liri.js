

//All node modules required to run the application........
var fs = require("fs");
var dotenv = require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var client = new Twitter(keys.twitter);   
var spotify = new Spotify(keys.spotify);  
var liriCommand = process.argv[2];


//We will then creae a switch-case statememt.
//The switch-case will direct which function will run.
switch ( liriCommand) {
	case "my-tweets" : 
		tweetsDisplay();
	break;
	console.log("spotify if statement works!");
	case "spotify-this-song" : 
		spotifyDisplay();
	break;

	case "movie-this" : 
		movieDisplay();
	break;

	case "do-what-it-says" : 
		doWhatItSayDisplay();
	break;
}


//FUNCTIONS FOR THE LIRI APP TO RUN................................

//function for twitter to call twitter api

function tweetsDisplay() {
	var twitterName = process.argv[3];

	if (!twitterName) {
		twitterName = "cnn";
		var params = {screen_name : twitterName};
		client.get('statuses/user_timeline/', params, function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < 20; i++) {
					var getTweets = "\n" + "------------------------" + i +"--------------------------------------------------" + "\n" +
					"@" + tweets[i].user.screen_name + ":" + tweets[i] + "\n" + 
					tweets[i].text + tweets[i].created_at + "\n" +
					"-------------------------------------------------------------------------------------------" + "\n";
					console.log(getTweets);
				}
			} else {
				console.log("Twitter error: " + error);
			}
		});	
	} else {
			var params = {screen_name : twitterName};
			client.get('statuses/user_timeline/', params, function(error, tweets, response) {
			if (error) {
				console.log("Twitter error: " + error);
				
			} else {
				for (var i = 0; i < 20; i++) {
					var num = i +1;
					var getTweets = "\n" + "---------------------------------------" + num +"--------------------------------------------------" + "\n" +
					"@" + tweets[i].user.screen_name + ":" + "\n" + "Topic: " + tweets[i].text + "\n" + "Created On: " + tweets[i].created_at + "\n" +
					"-------------------------------------------------------------------------------------------" + "\n";
					console.log(getTweets);
					logDisplay(getTweets);
				}
			}
		});
	}
}


//function for spotify to call spotify api...........

function spotifyDisplay() {
	var spotifyName = process.argv[3];

	if (!spotifyName) {
		spotifyName = "i want it that way";
		spotify.search({ type: "track", query: spotifyName}, function(error, data) {
			if (error) {
				console.log("Spotify error: " + error);
			} else {
				var track = data.tracks.items[0].name;
				var artist = data.tracks.items[0].artists[0].name;
				var album = data.tracks.items[0].album.name;
				var url = data.tracks.items[0].preview_url;
				var getSpotifys = 
				"\n" + "----------------------------------------------------" + "\n" +
				"Artists name: " + artist + "\n" +
				"Album name: " + album + "\n" +
				"Song name: " + track + "\n" +
				"Preview Url: " + url + "\n" +
				"----------------------------------------------------" + "\n";
				console.log(getSpotifys);
				logDisplay(getSpotifys);
			}
		});

	} else {
		
		spotify.search({ type: "track", query: spotifyName}, function(error, data) {
			if (error) {
				console.log("Spotify error: " + error);
			} else {
				var track = data.tracks.items[0].name;
				var artist = data.tracks.items[0].artists[0].name;
				var album = data.tracks.items[0].album.name;
				var url = data.tracks.items[0].preview_url;
				var getSpotifys = 
				"\n" + "----------------------------------------------------" + "\n" +
				"Artists name: " + artist + "\n"+
				"Album name: " + album + "\n"+
				"Song name: " + track + "\n"+
				"Preview Url: " + url + "\n"+
				"-----------------------------------------------------" + "\n";
				console.log(getSpotifys);
				logDisplay(getSpotifys);
			}
		});
	}
}

//function for OMDB request..........................

function movieDisplay() {
	var movie = process.argv[3];

	if (!movie) {
		movie = "Mr. Nobody";
		request("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("Title: Mr. Nobody");
				var movieResult = 
				"\n" + "--------------------------------------------------------------------" + "\n"+
				"  Title: " + JSON.parse(body).Title + "\n" +
				"  Year: " + JSON.parse(body).Year + "\n" +
				"  Imdb Rating: " + JSON.parse(body).imdbRating + "\n" +
				"  Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value+ "\n" +
				"  Country: " + JSON.parse(body).Country + "\n" +
				"  Language: " + JSON.parse(body).Language + "\n" +
				"  Plot: " + JSON.parse(body).Plot + "\n" +
				"  Actors: " + JSON.parse(body).Actors + "\n" +
				"--------------------------------------------------------------------" + "\n";
				console.log(movieResult);	
				logDisplay(movieResult);

			}
			else {
				console.log("error: ", error);
			}
		});
	}
	else {
		request("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var getMovie = JSON.parse(body);
				var movieResult = 
				"\n" + "--------------------------------------------------------------------" + "\n" +
				"  Title: " + getMovie.Title + "\n" +
				"  Year: " + getMovie.Year + "\n" +
				"  Imdb Rating: " + getMovie.imdbRating + "\n" +
				"  Rotten Tomatoes Rating: " + getMovie.Ratings[1].Value+ "\n" +
				"  Country: " + getMovie.Country + "\n" +
				"  Language: " + getMovie.Language + "\n" +
				"  Plot: " + getMovie.Plot + "\n" +
				"  Actors: " + getMovie.Actors + "\n" +
				"--------------------------------------------------------------------" + "\n";
				console.log(movieResult);
				logDisplay(movieResult);
			}
			else {
				console.log("OMDB error: " + error);
			}
		});
	}
};


//function for do-what -it-says to access  the random.txt file............

function doWhatItSayDisplay() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			console.log("Random text error: " + error);
		}
		else {
			console.log(data);
			var doResult = data.split(",");
			spotifyDisplay(doResult[0], doResult[1]);
		} 
	});
}

//function for logging the input into a file: "log.txt"................

function logDisplay(logresult) {
	
	//create a file called "log.txt" and append the input into the file............
	fs.appendFile("log.txt", logresult, function(error) {
		if (error) {
			console.log(error);
		} 

	});
}



