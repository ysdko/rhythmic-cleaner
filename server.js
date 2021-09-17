const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', getReq);
server.listen(3000);
console.log('Server running …');

function getType(_url) {
  var types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  }
  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return 'text/plain';
}

function getReq(req, res) {
  let url = req.url;
  
  //左辺にはurl以下のディレクトリを書く
  if ('/' === url) {
    //dataはhtmlの内容が入っているreadFile()の2引数目
    //第一のerrはエラー情報, 第二のdataはファイルの中身
    //https://www.tuyano.com/index3?id=1126003&page=2
    fs.readFile('./index.html', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if ('/css/baseCanvas.css' === url) {
    fs.readFile('./css/baseCanvas.css', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/selectMusicScene.js' === url) {
    fs.readFile('./selectMusicScene.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/imgs/title.png' === url) {
    fs.readFile('./imgs/title.png', 'binary', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data, 'binary'); 
      res.end();
    });
  }
  else if ('/mainScene.js' === url) {
    fs.readFile('mainScene.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/device_motion.js' == url) {
    fs.readFile('device_motion.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/config.js' == url) {
    fs.readFile('config.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': getType(url)});
      res.write(data); 
      res.end();
    });
  } 
  else if ('/component.js' == url) {
    fs.readFile('component.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/titleScene.js' == url) {
    fs.readFile('titleScene.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data); 
      res.end();
    });
  }
  else if ('/resultScene.js' == url) {
    fs.readFile('resultScene.js', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': getType(url)});
      res.write(data); 
      res.end();
    });
  }
  else if ('/clock.json' == url) {
    fs.readFile('clock.json', 'UTF-8', function (err, data) {
      if(err) {
        console.error(err.message);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(data); 
      res.end();
    });
  }
  else if('/imgs/twitter_logo.png' == url){
    res.writeHead(200,{"Content-Type":"image/png"});
    var output2=fs.readFileSync("./imgs/twitter_logo.png", "binary");
    res.end(output2, "binary");
  }
}