
var http = require("http");

http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body as "Hello World"
    response.end('Hello World\n');
 }).listen(8081);
 // Console will print the message
 console.log('Server running at http://127.0.0.1:8081/');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


 var fs = require("fs");
 var data = fs.readFileSync('input.txt');
 console.log(data.toString());
 console.log("Program Ended first");

 
fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});
console.log("Program Ended two");


var express = require('express');
var app = express();
app.set('port', 8880);
app.post('/', function (req, res) {
res.send('Hello Madurai');
})

app.get('/ab*cd', function(req, res) {   
    console.log("Got a GET request for /ab*cd");
    res.send('karthik Pattern Match');
 })


 app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })


 app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 
 app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port); 
    })
 

 