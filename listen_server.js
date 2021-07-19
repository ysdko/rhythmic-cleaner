// nodeのコアモジュールのhttpを使う
var http = require('http');
var html = require('fs').readFileSync('./listen_server.html');
var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    //res.write('hello world');
    res.end(html);
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(3000);