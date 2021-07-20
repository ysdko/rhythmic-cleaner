let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', getJs);
server.listen(3000);
console.log('Server running …');
function getJs(req, res) {
let url = req.url;
//console.log(url);
//左辺にはurl以下のディレクトリを書く
if ('/' == url) {
  //dataはhtmlの内容が入っているreadFile()の2引数目
  fs.readFile('device_motion.html', 'UTF-8', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })}
  else if ('/tamborine.mp3' == url) {
    var returnData = {};

    fs.readFile('tamborine.mp3', function(err, file){
        var base64File = new Buffer(file, 'binary').toString('base64');

        returnData.fileContent = base64File;

        res.json(returnData);
    })
  }
}