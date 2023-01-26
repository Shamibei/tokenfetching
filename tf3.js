const express = require('express');
const request = require('request-promise');
const DataStore = require('data-store');

const app = express();
const store = new DataStore({ path: 'path/to/store/file.json' });

app.get('/generate-jwt', async (req, res) => {
  try {
    const response = await request.post({
      url: 'http://<indicators.toolkit.ttcanc.org>/api/session',
      json: true,
      body: {
        username: '<mibeishannelle@gmail.com>',
        password: '<mibeishannelle@gmail.2022>'
      }
    });
    store.set('jwt', response.id);
    res.send('JWT token generated and stored successfully');
  } catch (error) {
    res.status(500).send(`Error generating JWT token: ${error.message}`);
  }
});

// Generate JWT token every hour
setInterval(() => {
  app.get('/generate-jwt');
}, 60 * 60 * 1000);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


/*
Install the required modules by running npm install request-promise data-store
Import the modules in your code using const request = require('request-promise'); const DataStore = require('data-store');
Create a new instance of the DataStore module to store the JWT token: const store = new DataStore({ path: 'path/to/store/file.json' });
Use the request module to make a POST request to the Metabase API endpoint for generating JWT tokens, 
passing in the necessary authentication credentials. 
This endpoint is typically http://<your-metabase-server>/api/session
In the response, the JWT token will be returned in the id field of the JSON object. 
Store this token in the DataStore instance using store.set('jwt', response.id);
To retrieve the JWT token from the DataStore, you can use const jwt = store.get('jwt');
To generate the JWT token on an hourly basis, you can use the built-in setInterval function in Node.js to call the code for generating and storing the token every hour.

Here is an example of the complete code for generating and storing a JWT token using Node.js, express.js, and the request and data-store modules:
 */


