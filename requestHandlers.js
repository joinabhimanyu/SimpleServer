var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response, request) {
console.log('Request for "start" was called');

var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" method="post" enctype="multipart/form-data">'+
'<input type="file" name="upload" multiple="multiple"/>'+
'<input type="submit" value="Upload file" />'+
'</form>'+
'</body>'+
'</html>';
response.writeHead(200, {"Content-Type": "text/html"});
response.write(body);
response.end();

}

function upload(response, request) {
console.log("Request handler 'upload' was called.");

var form = new formidable.IncomingForm();
console.log("about to parse");

form.parse(request, function(error, fields, files) {
console.log("parsing done");
/* Possible error on Windows systems:
tried to rename to an already existing file */
fs.rename(files.upload.path, "/tmp/test.jpg", function(error) {
if (error) {
fs.unlink("/tmp/test.jpg");
fs.rename(files.upload.path, "/tmp/test.jpg");
}
});
response.writeHead(200, {"Content-Type": "text/html"});
response.write("received image:<br/>");
response.write("<div><a href='/'>Go back to main page.</a><div>");
response.write("<div><img src='/show' style='width:100px;height:100px;' /></div>");
response.end();
});

}

function show(response, request) {
console.log("Request handler 'show' was called");
fs.readFile("/tmp/test.jpg","binary", function (error,file) {
if (error) {
response.writeHead(500 ,{"Content-Type":"text/plain"});
response.write(error + "\n");
response.end();
} else {
response.writeHead(200 ,{"Content-Type":"image/jpg"});
response.write(file, "binary");
response.end();
}
});
}

exports.start = start;
exports.upload = upload;
exports.show = show;