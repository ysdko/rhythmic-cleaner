let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', getJs);
server.listen(3000);
console.log('Server running …');
function getJs(req, res) {
    let url = req.url;
    console.log(url);
    if ('/' == url) {
    fs.readFile('./test.html', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
res.write(data);
res.end();
    });
    }
    else if ('/test.js' == url) {
    fs.readFile('./test.js', 'UTF-8', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
});
  } 
}