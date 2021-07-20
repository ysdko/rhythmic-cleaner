how to use javascript

-コメントアウト　//
-ブラウザのコンソールにメッセージを表示　console.log()

-モジュールとは
C++(python)でいうライブラリ(モジュール)と同じ。
別ファイルに機能を分けたもの
-httpモジュールとは
HTTPサーバやHTTPクライアントとしての機能を構築するために使われるもの

-var http = require('http');
varは変数であるということ
httpは変数名
require()はモジュールを呼び出すための関数
'http'はモジュール名

-http.createServer( サーバ側の処理 )
createServer()の引数はヘッダ情報や表示するコンテンツを設定するなどの処理を記述

-hsモジュールはhtmlを読み込む時に使用する

-   res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('hello world');
    res.end(html);

    ヘッダの指定、hello worldの書き込み、end()でhtmlの表示

-   if(request.method === 'POST') {
  
        //ここに処理を記述する
  
    }

    でリクエスト変数requestの内容がPOSTだった時のみの処理を記述

    