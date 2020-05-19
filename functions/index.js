const RssParser = require('rss-parser');
const rssParser = new RssParser();
const functions = require('firebase-functions');

exports.fetchRSS = functions.https.onCall((data) =>{
    return rssParser.parseURL(data.rss)
});
