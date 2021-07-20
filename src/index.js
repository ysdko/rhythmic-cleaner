// phina.jsを有効化 <--- (1)
import 'phina.js'
phina.globalize()

var ASSETS = {
		// サウンド
		sound: {
		'music': 'https://cdn.jsdelivr.net/gh/alkn203/assets_etc@master/maou-fantasy-01.mp3',
		},
};

// メインシーン定義 <--- (2)
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景
    this.backgroundColor = 'black';
    // Shape作成
    var shape = Shape({
      backgroundColor: 'red',
      x: this.gridX.center(),
      y: this.gridY.center(),
    }).addChildTo(this);
    // タッチを有効に
    shape.setInteractive(true);
    // タッチイベント
    shape.onpointend = function() {
      // 音再生
      SoundManager.play('music');
	  
    };
  },
});

// アプリ実行 <--- (3)
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    title: 'リズムで掃除機',
    // MainScene から開始
    //startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});

