
require("dotenv").config();


let request = require("request");
let fs = require("fs");
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let userChoice = process.argv[2]; 
let choiceParameter = process.argv[3];


UserInputs(userChoice, choiceParameter);


function UserInputs (userChoice, choiceParameter)
{
    switch (userChoice) 
    {
        case "concert":
            showConcertInfo(choiceParameter);
            break;
        case "spotify-my-song":
            showSongInfo(choiceParameter);
            break;
        case "movie":
            showMovieInfo(choiceParameter);
            break;
        case 'do-what-it-says':
            showSomeInfo();
            break;
        default: 
        console.log(`Invalid choice!!! 
            Please type one of the following choices: 
            concert 
            spotify-my-song 
            movie 
            do-what-it-says`);
    };
};

//Funtion for Concert Info: Bands in Town
function showConcertInfo(choiceParameter)
{
    let queryUrl = "https://rest.bandsintown.com/artists/" + choiceParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) 
    {
    
        if (!error && response.statusCode === 200) 
        {
            let concerts = JSON.parse(body);
            for (let i = 0; i < concerts.length; i++) 
            {  
                console.log("**********EVENT INFO*********");  
                fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
                console.log(i);
                fs.appendFileSync("log.txt", i+"\n");
                console.log("Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
                console.log("Venue Location: " +  concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
                console.log("Date of the Event: " +  concerts[i].datetime);
                fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************"+"\n");
            }
        } 
        else
        {
            console.log('Error occurred.');
        }
    });
}

//function for spotify.
function showSongInfo(choiceParameter) 
{
    if (choiceParameter === undefined) 
    {
        choiceParameter = "The Sign"; //default Song
    }
    spotify.search(
    {
        type: "track",
        query: choiceParameter
    },
    function (err, data) 
    {
        if (err) 
        {
            console.log("Error occurred: " + err);
            return;
        }
        let songs = data.tracks.items;

        for (let i = 0; i < songs.length; i++) 
        {
            console.log(i);
            fs.appendFileSync("log.txt", i +"\n");
            console.log("Song name: " + songs[i].name);
            fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
            console.log("Preview song: " + songs[i].preview_url);
            fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
            console.log("Album: " + songs[i].album.name);
            fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
            console.log("Artist(s): " + songs[i].artists[0].name);
            fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
        };
    });
};

