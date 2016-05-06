import fs from "fs";
import path from "path";
import querystring from "querystring";
import url from "url";
// Require externals
var google = require('googleapis');
var GoogleAuth = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// Not sure why __dirname doesn't work here
const PACKAGE_PATH = path.resolve('./packages/gcal');
const TOKEN_PATH = path.resolve(PACKAGE_PATH, './token.json');
const SECRET_PATH = path.resolve(PACKAGE_PATH, './client_secret.json');

/**
 * Authorizes application for Google Calendar via OAuth 2.0
 * @param electron - electron library to open browser window for OAuth flow
 * @returns {Promise} - Promises the Google oauthclient that can be used with googleapis
 */
function authorizeGcal(electron) {
  // Load client secrets from a local file.
  // Okay to have the secret in public according to docs.
  // See https://developers.google.com/identity/protocols/OAuth2InstalledApp#overview
  return new Promise(resolve => {
    fs.readFile(SECRET_PATH, function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Google Calendar API.
      const credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const auth = new GoogleAuth();
      const oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      getToken(oauth2Client, electron).then(token => {
        oauth2Client.credentials = token;
        resolve(oauth2Client)
      });
    });
  });

};

function getToken(oauth2Client, electron) {
  return new Promise(resolve => {
    // Find existing token
    fs.readFile(TOKEN_PATH, function (err, token) {
      if (!err) {
        // File exists, return token
        return resolve(JSON.parse(token));
      }

      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      receiveOAuthCode(electron, authUrl)
        .then(code => receiveOAuthToken(code, oauth2Client))
        .then(token => resolve(token));
    });
  })
}

function receiveOAuthToken(code, oauth2Client) {
  return new Promise((resolve)=> {
    oauth2Client.getToken(code, (err, token) => {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (err) {
        console.error(err);
        resolve(null)
      }
      storeToken(token);
      resolve(token);
    });
  })
}

function receiveOAuthCode(electron, authUrl) {
  const win = new electron.remote.BrowserWindow({
    // show: false,
    width: 1024,
    height: 728
  });

  return new Promise(resolve => {
    win.webContents.on('will-navigate', function (e, targetUrl) {
      e.preventDefault();
      console.log(`Navigating to ${targetUrl}`);
      const qs = querystring.parse(url.parse(targetUrl).query);
      if (qs.code) {
        win.close();

        resolve(qs.code);
      } else {
        console.error('Error trying to get OAuth code for user')
      }
    });
    // TODO parse token and store it
    win.loadURL(authUrl);
  });

}


/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}
