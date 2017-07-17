const { config } = require('../config.js');
const twit = require('twit');
var T = new twit(config);

var postTwit = (content, callback) =>{

	T.get('account/verify_credentials', { skip_status: true }).then (results => {

     Promise.all([
     	 T.post('statuses/update', {status: content})

     ]).then(results => {

 	callback(undefined, results);

     }).catch(error => {

 	 callback(error);

      });
   });
  };
  module.exports.postTwit = postTwit;