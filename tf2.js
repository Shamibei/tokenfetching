const request = require('request'); // Import the 'request' module for making HTTP requests
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' module for working with JWT tokens

const METABASE_URL = 'http://your-metabase-server.com'; // The base URL of your Metabase server
const USERNAME = 'your-username'; // Your Metabase username
const PASSWORD = 'your-password'; // Your Metabase password

// Set up the request options for logging in to Metabase
const loginOpts = {
  url: METABASE_URL + '/api/session', // The login endpoint of the Metabase API
  method: 'POST', // Use the POST method to submit the login request
  json: {
    username: USERNAME, // Provide the username in the request body
    password: PASSWORD // Provide the password in the request body
  }
};

// Send the login request and handle the response
request(loginOpts, (error, response, body) => {
  if (error) {
    console.error(error); // Log any errors to the console
    return;
  }

  // If login was successful, store the JWT token
  if (response.statusCode === 200) {
    const token = body.id; // The JWT token is included in the response body
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => { // Verify the JWT token
      if (error) {
        console.error(error); // Log any errors to the console
        return;
      }

      // Save the token to a file or database
      saveToken(token);
    });
  } else {
    console.error('Login failed: ' + response.statusCode); // If login failed, log the error code to the console
  }
});

function saveToken(token) {
  // Code for saving the token goes here
}
