var express = require('express');
var app = express();
var fs = require("fs");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
//var path = require('path');

app.use(multer({ dest: '/tmp/'}).single('inputfilename'));
app.use(cookieParser())
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', 8880);

app.get('/', function (req, res) {
   res.send('Hello Madurai');
   console.log("Cookies: ", req.cookies)
})



app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   console.log(req.cookies);
   res.send(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   console.log(req.cookies);
   res.send(JSON.stringify(response));
})


app.post('/file_upload', function (req, res) {
   console.log(req.file.name);
   console.log(req.file.path);
   console.log(req.file.type);
   var file = __dirname + "/" + req.file.name;

   // var tempPath = req.file.path, 
   // ext = path.extname(req.file.name).toLowerCase(),
   // targetPath = path.resolve('./tmp/' + file + ext);

   // if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
   //    fs.rename(tempPath, targetPath, function(err) {
   //       if (err) throw err;
   //       //res.redirect('/images/' + imgUrl);
   //    });
   // } else {
   //    fs.unlink(tempPath, function () {
   //       if (err) throw err;
   //       //res.json(500, {error: 'Only image files are allowed.'});
   //    });
   // }

   fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.file.name
               };
            }
         console.log(req.cookies);
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})




var server = app.listen(app.get('port'), function() {
   console.log('Express server listening on port ' + server.address().port); 
})