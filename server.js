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
    fs.readFile('index.html', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if ('/main.js' == url) {
    fs.readFile('main.js', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/device_motion.js' == url) {
    fs.readFile('device_motion.js', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/config.js' == url) {
    fs.readFile('config.js', 'UTF-8', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
    });
  }  
  else if ('/component.js' == url) {
    fs.readFile('component.js', 'UTF-8', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
    });
  }
  else if ('/titlescene.js' == url) {
    fs.readFile('titlescene.js', 'UTF-8', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
    });
  }
  else if ('/clock.json' == url) {
    fs.readFile('clock.json', 'UTF-8', function (err, data) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    res.end();
    });
  }

}