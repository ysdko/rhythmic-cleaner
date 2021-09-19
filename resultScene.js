phina.globalize();

phina.define('ResultScene2', {
  superClass: 'DisplayScene',

  init: function(params) {
    // 親クラス初期化
    this.superInit(params);
    // 背景色
    this.backgroundColor = 'black';
    this.rank = '';
    var bgGroup = DisplayElement().addChildTo(this);
    var SCALE = 65;

    self = this;
    var twitter_group = DisplayElement().addChildTo(this).setPosition(this.gridX.span(2.5), this.gridY.span(12.5));

    // switch(params.music_title){
    //   case 
    // }

    if (params.total_score > 30000){
      this.rank = "S";
    }else if(params.result_score > 2000){
      this.rank = "A";
    }else if(params.result_score > 10000){
      this.rank = "B";
    }else{
      this.rank = "C";
    }




    // var last_image = Sprite('last_image').addChildTo(bgGroup)
    // .setPosition(this.gridX.center(), this.gridY.center());
    // // .physical.force(-1, 0);
    // last_image.height = 16 * SCALE;
    // last_image.width = 9 * SCALE;

    this.bgGroup = bgGroup;

    // ラベル
    Label({
      text: params.music_title,
      fontSize: 60,
      fill: 'white',
      stroke: 'cyan',
      strokeWidth: 5
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(2));

    Label({
      text: `score: ${params.result_score}`,
      fontSize: 60,
      fill: 'cyan',
      stroke: 'white',
      strokeWidth: 10
    }).addChildTo(this).setPosition(this.gridX.span(10), this.gridY.span(4.2));

    Label({
      text: this.rank,
      fontSize: 100,
      fill: 'magenta',
      stroke: 'white',
      strokeWidth: 10
    }).addChildTo(this).setPosition(this.gridX.span(3.5), this.gridY.span(4));

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
    .addChildTo(twitter_group)

    twitter_button = CircleShape({
      fill: "#00acee"
    })
    .addChildTo(twitter_group)
    // .setPosition(this.gridX.center(),this.gridY.center());
    twitter_button.setInteractive(true);
    twitter_button.onpointstart = function() {
      var text = '{0}\nScore: {1}\n'.format("リズムDe!掃除機",params.result_score);
      var url = phina.social.Twitter.createURL({
        text: text,
        hashtags: ["リズムDe掃除機", "技育展"],
        url: params.url// 指定がない場合はlocation.hrefが代入される
      });

    // 新規タブで開く場合
    var childWindow = window.open('about:blank');
    childWindow.location.href = url;
  
    };

    twitter_image = Sprite('twitter_logo')
    .addChildTo(twitter_group)
    twitter_image.height = 30;
    twitter_image.width = 30;
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