var http = require('http');
var edge = require('edge');

var querySample = edge.func({
assemblyFile: 'CLSBforNode.dll',
typeName: 'CLSBforNode.SampleLib',
methodName: 'Invoke'
});

function logError(err, res) {
res.writeHead(200 ,{"Content-Type":"text/plain"});
res.write("error is " + err);
res.end();
}

http.createServer(function (req,res) {

res.writeHead(200, {"Content-Type":"text/html"});

var data = {};

querySample(data, function (err, result) {

if (err) { logError(err, res); return; }
        if (result) {
            res.write("<ul>");
            result.forEach(function(WindowsDtls) {
                res.write("<li>" + WindowsDtls.Name + " " + WindowsDtls.Quantity + ": " + WindowsDtls.Price + "</li>");
            });
            res.end("</ul>");
            //res.write("<p>" + result + "</p>")
        }
        else {
            res.end("No results");
        }

});

}).listen(8080);

console.log('server started');