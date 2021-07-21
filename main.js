// // phina.js をグローバル領域に展開
// phina.globalize();

// // MainScene クラスを定義
// phina.define('MainScene', {
//   superClass: 'CanvasScene',
//   init: function() {
//     this.superInit();
//     // 背景色を指定
//     this.backgroundColor = '#444';
//     // ラベルを生成
//     this.label = Label('Hello, phina.js!').addChildTo(this);
//     this.label.x = this.gridX.center(); // x 座標
//     this.label.y = this.gridY.center(); // y 座標
//     this.label.fill = 'white'; // 塗りつぶし色
//   },
// });

// // メイン処理
// phina.main(function() {
//   // アプリケーション生成
//   var app = GameApp({
//     startLabel: 'main', // メインシーンから開始する
//   });
//   // アプリケーション実行
//   app.run();
// });

function loadFile(){
  socket.get('/directory/readFile', function(response){
      var audioSrc = 'data:audio/mp3;base64,' + response.fileContent;
      var audio = new Audio();

      audio.src = audioSrc;
      audio.load();
      audio.play();
  });
}