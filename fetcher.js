const fs = require('fs');
const request = require('request');
const userInput = process.argv.slice(2);

const fetchURL = userInput[0];
const fileLocation = userInput[1];

request(fetchURL, (error, response, body) => {
  if (error) {
    console.log('Error fetching file', error);
    console.log('Status code: ', response && response.statusCode); 
  } else {
    fs.writeFile(fileLocation, body, (err) => {
      //it would save it as a txt file if it wasn't a good location anyway
      //so I just made it only allow things with ./ at the start. 
      if (err || fileLocation[0] + fileLocation[1] != './') {
        console.log('Error creating file. Invalid location target. Use: ./your.file');
      }
      else {
        console.log(`Downloaded and saved ${fs.statSync(fileLocation).size} bytes to ${fileLocation}`);
      }
    })
  }
});


//examples:
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html