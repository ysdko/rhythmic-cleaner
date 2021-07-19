// nodeのコアモジュール(オブジェクト)のhttpを使う
var http = require('http');
//外部から読み込むファイル
var html = require('fs').readFileSync('./test2.html');
//httpサーバオブジェクト生成
//必要な設定をした後に実行する
var server = http.createServer();
//サーバにrequestが届いた時の処理を別で記述


//第一引数はイベント名、第二引数は組み込む関数
//requestイベントにfunction関数を割り当てている
//すなわち、ブラウザからサーバにアクセスした時のサーバの処理を組み込む
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    //res.write('hello world');
    res.write(html);
    res.end();
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(3000);
console.log('Server running!');