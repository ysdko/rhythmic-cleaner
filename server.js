const http = require('http');
const fs = require('fs');
const server = http.createServer();
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  'else': 'text/plain',
}
const codeTypes = {
  '.html': 'UTF-8',
  '.css': 'UTF-8',
  '.js': 'UTF-8',
  '.json': 'UTF-8',
  '.png': 'binary',
  '.gif': 'binary',
  '.mp3': 'binary',
  'else': 'UTF-8',
}

function getType(_url) {
  console.log("test2")
  for (let key in contentTypes)
    if (_url.endsWith(key))
      return {contentType: contentTypes[key], codeType: codeTypes[key]};
  return {contentType: contentTypes['else'], codeType: codeTypes['else']};
}

function getReq(req, res) {
  console.log("test1")
  let url = req.url;
  if (url === '/') url = '/index.html';
  const types = getType(url);
  const filePath = '.' + url;

  fs.readFile(filePath, types.codeType, function(err, data){
    if(err) {
      console.error(err.message);
      return 1;
    }
    res.writeHead(200, {'Content-Type': types.contentType});
    if (types.codeType === 'UTF-8')
      res.write(data);
    else
      res.write(data, 'binary');
    res.end();
  });
}

server.on('request', getReq);
server.listen(process.env.PORT || '3000');
console.log('Server running …');