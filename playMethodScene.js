phina.globalize();

phina.define("PlayMethodScene", {
  superClass: "DisplayScene",

  init: function (params) {
    this.superInit(params);
    this.backgroundColor = "black";
    const self = this;

    const playMethodGroup = DisplayElement()
      .setPosition(this.gridX.center(), this.gridY.span(1))
      .addChildTo(this);
    const playMethodButton = RectangleShape({
      width: 220,
      height: 80,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 7,
      cornerRadius: 16,
    })
      .addChildTo(playMethodGroup)
      .setInteractive(true);
    Label({
      text: "遊び方",
      fontSize: 48,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(playMethodGroup);

    Sprite('play_image').addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5.5)).setScale(0.3, 0.3);

    const textGroup = DisplayElement()
    .setPosition(this.gridX.center(), this.gridY.span(11.3))
    .addChildTo(this);

    RectangleShape({
      width: 600,
      height: 270,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 10,
      cornerRadius: 16,
    })
      .addChildTo(textGroup)
      .setPosition(0, 0);

    Label({
      text: "1. スマホを掃除機に取り付けよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-280, -100)
      .addChildTo(textGroup);

    Label({
      text: "2. ノーツに合わせて掃除機をスライド\n    させよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-280, 0)
      .addChildTo(textGroup);

    Label({
      text: "3. 掃除機の音がうるさい場合はイヤホン\n    をつけよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-280, 100)
      .addChildTo(textGroup);

    const prevButtonGroup = DisplayElement()
      .setPosition(this.gridX.center(), this.gridY.span(14.5))
      .addChildTo(this);
    const prevButton = RectangleShape({
      width: 240,
      height: 100,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 10,
      cornerRadius: 45,
    }).addChildTo(prevButtonGroup);
    prevButton.setInteractive(true);
    prevButton.onpointstart = function () {
      // SoundManager.play('title_music');
      // self.app.pushScene(TitleScene(params));
      self.exit();
    };
    Label({
      text: "戻る",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(prevButtonGroup);
  },
});
