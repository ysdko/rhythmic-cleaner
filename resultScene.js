phina.globalize();

phina.define('ResultScene2', {
  superClass: 'DisplayScene',

  init: function(params) {
    // 親クラス初期化
    this.superInit(params);
    // 背景色
    this.backgroundColor = 'black';
    var bgGroup = DisplayElement().addChildTo(this);
    var SCALE = 65;

    self = this;

    // var last_image = Sprite('last_image').addChildTo(bgGroup)
    // .setPosition(this.gridX.center(), this.gridY.center());
    // // .physical.force(-1, 0);
    // last_image.height = 16 * SCALE;
    // last_image.width = 9 * SCALE;

    this.bgGroup = bgGroup;

    // ラベル
    Label({
      text: `シャイニングスター`,
      fontSize: 60,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(2));

    Label({
      text: `score: ${params.result_score}`,
      fontSize: 60,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.span(10), this.gridY.span(4.2));

    Label({
      text: "A",
      fontSize: 100,
      fill: 'cyan',
    }).addChildTo(this).setPosition(this.gridX.span(4), this.gridY.span(4));

    PathShape({
      paths:[
          Vector2(-300, 0),
          Vector2(300, 0)
      ]
  }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5));

  //スコア詳細
    ScoreView("perfect: ", params.perfect_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(6));
    ScoreView("great: ", params.great_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(7.5));
    ScoreView("good: ", params.good_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(9));
    ScoreView("miss: ", params.miss_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(10.5));





    //タイトル遷移ボタン
    Button({
      text: 'もう一度遊ぶ',
      fontColor: 'white',
      strokeWidth:10,
      stroke:"cyan",
      fill: "black",
      width: 300,
      cornerRadius:40
    })
    .setOrigin(0.5, 0.5)
    .setPosition(this.gridX.center(), this.gridY.span(12.5))
    .addChildTo(this)
    .onpointstart=function() {
      self.exit(); // 自分を渡す
    };


    // twitterシェアボタン
    var shareButton = phina.ui.Button({
      text: "twitter",
      fontSize: 30,
      width: 230,
      height: 54,
      cornerRadius:25
    })
    .setPosition(this.gridX.center(), this.gridY.span(14.5))
    .addChildTo(this)

    shareButton.onclick = function(){
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