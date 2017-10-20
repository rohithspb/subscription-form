var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');


var UserModel;

var app = express();

app.use(cors());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static('web-app'));


initializemongo();

app.get('/user', function(req, resp){
	 // resp.send('Hi Rohit');
	 UserModel.find({}, function(err,docs){
	    if (err) return resp.send(500, { error: err });
	    return resp.send(docs);

	 });

});


app.post('/user', function(req, resp){
	var userData = req.body;
	console.log('saving user data..', JSON.stringify(userData));

	 UserModel.findOneAndUpdate({"email": userData.email}, userData, {upsert:true}, function(err, doc){
	    if (err) return resp.send(500, { error: err });

	    // send mail 
	    sendMail(userData);

	    return resp.send("succesfully subscribed");
	});
	 
})


console.log('starting the server...');

app.listen(3000,function(){
	console.log('started the server at 3000 port...');
})


//mongoose conection 
function initializemongo() {
	var mongoConnection = mongoose.connect("mongodb://user:user@ds121015.mlab.com:21015/user");

	mongoose.connection.on("connected", function(){
		console.log('Connected to mongoDB')
	})

	mongoose.connection.on("error", function(err){
		console.log('Error while Connecting to mongoDB', err);
	})

	var nameSchema = new mongoose.Schema({
	 username: String,
	 email: String,
	 mobile_number: String,
	 city: String
	},{collection:'users'});

	UserModel = mongoConnection.model("User", nameSchema);
}

function sendMail(userData) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rohithspb@gmail.com', // Your email id
            pass: '@@@@@@' // Your password
        },
        rejectUnauthorized:false
    });

    var mailOptions = {
	    from: 'rohith@gmail.com', // sender address
	    to: userData.email, // list of receivers
	    subject: 'Subscribed to mail', // Subject line
	    //text: text //, // plaintext body
	    html: '<b>Hi '+userData.username+', </b> <br> You have been subscribed our service. <br> Thanks <br> Rohit' // You can choose to send an HTML body instead
	};


	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	console.log('________________________________________');
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    };
	});
}