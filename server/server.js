const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes');
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = '5b64d36c1f04495b86462e680c118b7d'; // Your client id
const client_secret = 'cf0a9ba21ae34585a72b01239bbc0037'; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

const app = express();  //start express server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../src/dist/top-playlists')))
  .use(cors())
  .use(cookieParser());

/**app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/top-playlists/index.html'));  //login page
});**/

mongoose.connect('mongodb://127.0.0.1:27017/top-playlists-db'); //connect to db

mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', function () {
  console.info('Successfully connected to the database');
});

app.use('/api', routes);  //api routing on server/routes folder

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

let stateKey = 'spotify_auth_state';

app.get('/login',function (req,res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
})

/*app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/app/home/home.component.html'))
});

app.get('/my-playlists', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/app/my-playlists/my-playlists.component.html'))
});*/

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          getSpotifyUserPlaylists(access_token, body);
          saveSpotifyUser(body);

          // we can also pass the user to the browser
          res.redirect('/#' +
            body.id);
        });
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  console.log('entrei');
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

server.listen(port, function () {
  console.info(`Server started on http://localhost:${port}`)
});




/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let saveSpotifyUser = function (body) {
  let options = {
    url: 'http://localhost:3000/api/user',
    json: true,
    body: body
  };

  //register user in mongodb database
  request.post(options, function (error, response, body) {
  });
}

let getSpotifyUserPlaylists = function (accessToken, body) {
  let options = {
    url: 'https://api.spotify.com/v1/users/' + body.id + '/playlists',
    headers: { 'Authorization': 'Bearer ' + accessToken },
    json: true
  }

  request.get(options, function(error, response, body){
    body.items.forEach(item => addSpotifyPlaylist(item));
  });

}

let addSpotifyPlaylist = function (playlist){
  let options = {
    url: 'http://localhost:3000/api/playlist',
    json: true,
    body: playlist
  }

  //register playlist in mongodb database
  request.post(options, function (error, response, body) {
  });
}
