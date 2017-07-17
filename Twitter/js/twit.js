const { config } = require('../config.js');
const twit = require('twit');
var T = new twit(config);

var twitProfile = (callback) => {

T.get('account/verify_credentials', { skip_status: true }).then (results => {

Promise.all([

	T.get('friends/list', {count: 5}),

	T.get('statuses/user_timeline', {count: 5}),

	T.get('direct_messages', {count: 5}),

	T.get('users/profile_banner', {screen_name: 'cmfay722'})

	]).then(results => {

	const twitFriends = results[0].data;

	const twitTimeline = results[1].data;

	const twitMessages = results[2].data;

	const banner = results[3].data;

	const twitProfile = {twitFriends, twitTimeline, twitMessages, banner};

	callback(undefined, twitProfile);



 }).catch(error => {
 	callback(error);
           
        });
    });

};

module.exports.twitProfile = twitProfile;