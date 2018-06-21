const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const express = require('express');
var cron = require('node-cron');
var request = require("request");
const app = express();

// Scheduler
cron.schedule('*/2 * * * *', function(){
  console.log('running a task every two minutes');
 // sendSMS();
});
// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'credentials.json';

// Load client secrets from a local file.

app.get('/', function (req, res) {
  res.send('Hello World');
  sendSMS();
})
//function for to read file
function sendSMS(){
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });
}
var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port

console.log("Example app listening at http://%s:%s", host, port)
}) 
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1JT9U6Np8h0nOCEOEhFOIPei6dqdO0HmrOlUjpJgVwz4/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

 // function to read file and perform operations
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1JT9U6Np8h0nOCEOEhFOIPei6dqdO0HmrOlUjpJgVwz4',
    range: 'Sheet2!A2:Z', //Sheet name and rows to read 
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    if (rows.length) {
      rows.map((row) => {
        var d = new Date(row[9]);
        var today = new Date();
        var timeDiff = Math.abs(d.getTime() - today.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        var msg;
        var mobileNo = row[22];
        // d = row[9];
      //  console.log('diff : ' + diffDays);
        if(diffDays == 32){
          mobileNo = mobileNo.replace('-' ,'');
          if(mobileNo.charAt(0) == '0')
          {
           // mobileNo = mobileNo.replaceAt(0 , '92')
            mobileNo = mobileNo.substring( 1 , mobileNo.length);
            mobileNo = '92' + mobileNo;
          }
          else if(mobileNo.charAt(0) != '9') {
            mobileNo = '92' + mobileNo;
          }
          
          msg = ''
          msg = 'Dear ' + row[20] + '\nYour Internet Subscription has been expired:-'+'\nID : ' +  row[11] + '\n';
           msg +='Package : ' +  row[10] + `\n`+
           `Please Recharge to avoid disconnection.`+ `\n`+
            `Please ignore if you already recharged.`+ `\n`+ `Thanks`;
           msg += '\nNet247 Power by CyberNET';
          msg +='\n03000-128247';
          msg += '\n03000-128247';
          msg += '\nwww.Net247.PK';
          msg += '\nwww.facebook.com/Net247PK';
          if(mobileNo.length == 12){
            var options = { method: 'GET',
            url: 'http://lifetimesms.com/json',
            qs: 
            { username: 'umarbits',
              password: 'umarumar',
              to: mobileNo,
              from: '8584',
              message: msg }
              };
              request(options, function (error, response, body) {
                if (error) throw new Error(error);
              
                console.log(body);
              });
          }
          
          console.log(msg);
          // //console.log(mobileNo);
          // console.log();
        }
        else if(diffDays == 35){
          mobileNo = mobileNo.replace('-' ,'');
          if(mobileNo.charAt(0) == '0')
          {
           // mobileNo = mobileNo.replaceAt(0 , '92')
            mobileNo = mobileNo.substring( 1 , mobileNo.length);
            mobileNo = '92' + mobileNo;
          }
          else if(mobileNo.charAt(0) != '9') {
            mobileNo = '92' + mobileNo;
          }
          
          msg = ''
          msg = 'Dear ' + row[20] + '\nYour Internet Subscription has been expired:-'+'\nID : ' +  row[11] + '\n';
           msg +='Package : ' +  row[10] + `\n`+
           `Will expire soon, Please Recharge to avoid disconnection.`+ `\n`+
            `Please ignore if you already recharged.`+ `\n`+ `Thanks`;
          msg += '\nNet247 Power by CyberNET';
          msg +='\n03000-128247';
          msg += '\n03000-128247';
          msg += '\nwww.Net247.PK';
          msg += '\nwww.facebook.com/Net247PK';
          if(mobileNo.length == 12){
            var options = { method: 'GET',
            url: 'http://lifetimesms.com/json',
            qs: 
            { username: 'umarbits',
              password: 'umarumar',
              to: mobileNo,
              from: '8584',
              message: msg }
              };
              request(options, function (error, response, body) {
                if (error) throw new Error(error);
              
                console.log(body);
              });
          }
          console.log(msg);
        
          // console.log(`${row[19]}`);
          // console.log('Dear ' + row[19] + '\n Your Internet Subscription has been expired:-')
          // console.log('ID : ' + + row[11]);
          // console.log('Package : ' +  row[10] + '\n Will expire soon, Please Recharge to avoid disconnection. \nPlease ignore if you already recharged.\n Thanks  ');
        }
        else if(diffDays == 39){
          mobileNo = mobileNo.replace('-' ,'');
          if(mobileNo.charAt(0) == '0')
          {
           // mobileNo = mobileNo.replaceAt(0 , '92')
            mobileNo = mobileNo.substring( 1 , mobileNo.length);
            mobileNo = '92' + mobileNo;
          }
          else if(mobileNo.charAt(0) != '9') {
            mobileNo = '92' + mobileNo;
          }
          
          msg = ''
          msg = 'Dear ' + row[20] + '\n Your Internet Subscription has been expired:-'+'\nID : ' +  row[11] + '\n';
          msg +='Package : ' +  row[10] + '\nWill expire within a week, Please Recharge to avoid disconnection. \nPlease ignore if you already recharged. \n Thanks  ';
          msg += '\nNet247 Power by CyberNET';
          msg +='\n03000-128247';
          msg += '\n03000-128247';
          msg += '\nwww.Net247.PK';
          msg += '\nwww.facebook.com/Net247PK';
          if(mobileNo.length == 12){
              var options = { method: 'GET',
              url: 'http://lifetimesms.com/json',
              qs: 
              { username: 'umarbits',
                password: 'umarumar',
                to: mobileNo,
                from: '8584',
                message: msg }
                };
                request(options, function (error, response, body) {
                  if (error) throw new Error(error);
                
                  console.log(body);
                });
            }
            console.log(msg);
          }
        
        //console.log(`${row[9]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
  
}