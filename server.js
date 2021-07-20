let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', getJs);
server.listen(3000);
console.log('Server running …');
function getJs(req, res) {
  //let url = req.url;
  //console.log(url);
  //左辺にはurl以下のディレクトリを書く
  //if ('/' == url) {
    //dataはhtmlの内容が入っているreadFile()の2引数目
    fs.readFile('device_motion.html', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  //} 
  // else if ('/ver1js.js' == url) {
  //   fs.readFile('ver1js.js', 'UTF-8', function (err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/plain'});
  //     res.write(data); 
  //     res.end();
  //   });} 
}