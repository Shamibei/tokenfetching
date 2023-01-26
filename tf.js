const request = require('request');
const jwt = require('jsonwebtoken');

const METABASE_URL = 'https://indicators.toolkit.ttcanc.org';
const USERNAME = 'mibeishannelle@gmail.com';
const PASSWORD = 'mibeishannelle@gmail.2022';

// Set up the request options for logging in to Metabase
const loginOpts = {
  url: METABASE_URL + '/api/session',
  method: 'POST',
  json: {
    username: USERNAME,
    password: PASSWORD
  }
};

// Send the login request and handle the response
request(loginOpts, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  // If login was successful, store the JWT token
  if (response.statusCode === 200) {
    const token = body.id;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error(error);
        return;
      }

      // Save the token to a file or database
      saveToken(token);
    });
  } else {
    console.error('Login failed: ' + response.statusCode);
  }
});

function saveToken(token) {
  // Code for saving the token goes here
}
