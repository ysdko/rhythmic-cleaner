phina.globalize();

phina.define('ResultScene2', {
  superClass: 'DisplayScene',

  init: function(params) {
    // 親クラス初期化
    this.superInit(params);
    // 背景色
    this.backgroundColor = 'white';
    var bgGroup = DisplayElement().addChildTo(this);
    var SCALE = 65;

    self = this;

    var last_image = Sprite('last_image').addChildTo(bgGroup)
    .setPosition(this.gridX.center(), this.gridY.center());
    // .physical.force(-1, 0);
    last_image.height = 16 * SCALE;
    last_image.width = 9 * SCALE;

    this.bgGroup = bgGroup;

    // ラベル
    Label({
      text: "スコア",
      fontSize: 60,
      fill: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5));

    Label({
      text: params.result_score,
      fontSize: 60,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7));

    //タイトル遷移ボタン
    Button({
      text: 'タイトルへ戻る',
      stroke:"white",
      strokeWidth:10,
      fill: "black",
      width: 300
    })
    .setOrigin(0.5, 0.5)
    .setPosition(this.width/2, this.height/2+30)
    .addChildTo(this)
    .onpointstart=function() {
      self.exit(); // 自分を渡す
    };


    // twitterシェアボタン
    var shareButton = phina.ui.Button({
      text: "twitterでシェア",
      fontSize: 30,
      width: 256,
      height: 54,
    })
    .setPosition(this.width/2, 50)
    .addChildTo(this)

    shareButton.onclick = function(){
      // alert(params.reselt_score)
      var text = '{0}\nScore: {1}\n'.format("リズムDe!掃除機",params.result_score);
      var url = phina.social.Twitter.createURL({
        text: text,
        hashtags: ["リズムDe掃除機", "技育展"],
        url: params.url// 指定がない場合はlocation.hrefが代入される
      });
      // 新規タブで開く
      var childWindow = window.open('about:blank');
      childWindow.location.href = url;
    };
  },

  // update: function() {
  //   // 背景のループ処理
  //   var first = this.bgGroup.children.first;
  //   if (first.right < 0) {
  //     first.addChildTo(this.bgGroup);
  //     this.bgGroup.children.last.left = this.bgGroup.children.first.right;
  //   }
  // },

});