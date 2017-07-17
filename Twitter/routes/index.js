const express = require('express');
const router = express.Router();
const app = express();
const moment = require('moment');
const postTwit = require('../js/postTwit.js');
const twitProfile = require('../js/twit.js');



//Main Route which get's the users information using the Twit API. Retrieves the information and then renders it to the Home template
router.get('/', (req, res) => {
twitProfile.twitProfile((err, results) => {
	if (err){
		res.send(err);
	
	}
	else if(results){
		results.twitTimeline.forEach( (val) =>{
			val.created_at = moment(val.created_at).format('MM-DD-YYYY');
		});
		results.twitMessages.forEach((val) =>{
			val.created_at_time = moment(val.created_at).format("hh:mm a");
			val.created_at = moment(val.created_at).format('MM-DD-YYYY');
			
		
		});

	
	res.render('home', results);
}
});
});

//Allows the user to post tweets tot heir twitter account
router.post('/post', (req,res) =>{

if (req.body.postText){
var tweetContent = req.body.postText;
postTwit.postTwit(tweetContent, (err,results) => {
	if (err){
	res.send('Unable to retrieve results');
	
	}
else if (results){
	res.redirect('/');
}

else {
	res.redirect('/');
}
});
}
});


router.use ((req, res) => {
	res.send('404 Page not found');
});



module.exports = router;