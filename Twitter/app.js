
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set up public assets
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

//define main route
const mainRoute = require('./routes/index');


// app.use("/", twitter)
app.use(mainRoute);


//local port
app.listen(3000, ()=>{
	console.log('application is running');
});


