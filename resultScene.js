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
      text: params.reselt_score,
      fontSize: 60,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7));
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    this.exit();  
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