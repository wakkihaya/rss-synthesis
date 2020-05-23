const rssProxy = require('./fetchRss.js');
const functions = require('firebase-functions');


exports.RssProxy = functions
    .region('us-central1')
    .https.onRequest(rssProxy);

// exports.fetchRSS = functions.https.onCall((data) =>{
//     return rssParser.parseURL(data.rss)
// });
