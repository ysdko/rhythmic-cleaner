<<<<<<< HEAD:listen_server.js
let http = require('http');
let fs = require('fs');
let server = http.createServer();
||||||| 20e6b86:listen_server.js
// nodeのコアモジュール(オブジェクト)のhttpを使う
var http = require('http');
//外部から読み込むファイル
var html = require('fs').readFileSync('./test2.html');
//httpサーバオブジェクト生成
//必要な設定をした後に実行する
var server = http.createServer();
//サーバにrequestが届いた時の処理を別で記述
=======
// nodeのコアモジュール(オブジェクト)のhttpを使う
var http = require('http');
//外部から読み込むファイル
var html = require('fs').readFileSync('./test.html');
//httpサーバオブジェクト生成
//必要な設定をした後に実行する
var server = http.createServer();
//サーバにrequestが届いた時の処理を別で記述
>>>>>>> cf91e68197c9f9591dfe8ea22dda2aade1dcf7b8:ver0/listen_server.js

<<<<<<< HEAD:listen_server.js
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
||||||| 20e6b86:listen_server.js

//第一引数はイベント名、第二引数は組み込む関数
//requestイベントにfunction関数を割り当てている
//すなわち、ブラウザからサーバにアクセスした時のサーバの処理を組み込む
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    //res.write('hello world');
    res.write(html);
    res.end();
=======

//第一引数はイベント名、第二引数は組み込む関数
//requestイベントにfunction関数を割り当てている
//すなわち、ブラウザからサーバにアクセスした時のサーバの処理を組み込む
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    //res.write('hello world');
    //res.write();
    res.end(html);
>>>>>>> cf91e68197c9f9591dfe8ea22dda2aade1dcf7b8:ver0/listen_server.js
});
  } 
}