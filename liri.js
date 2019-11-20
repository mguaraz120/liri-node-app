require("dotenv").config();

const keys = require("./keys.js");
let fs = require("fs");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let request = require("request");
let userChoice = process.argv[2];
let choiceParameter = process.argv[3];


function userInput (userChoice, choiceParameter)
{
switch (userChoice)
{
    case "spotify-this-song":
        showSongInfo(choiceParameter);
        break;
    case "concert-this":
        showConcertInfo(choiceParameter);
        break;
    case "movie-this":
        showMovieInfo(choiceParameter);
        break;
    case "do-what-it-says":
        showSomeInfo(choiceParameter);
        break;
    default:
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
}
}