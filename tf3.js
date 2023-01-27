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

setInterval(() => {
  app.get('/generate-jwt');
}, 60 * 60 * 1000);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



