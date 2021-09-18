phina.globalize();

phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = params.backgroundColor;
    SoundManager.volume = 0.15;
    SoundManager.musicVolume = 0.15;
    const self = this;

    // var canvas = document.getElementById('canvasId');
    // var rectangle = canvas.getContext('2d');
    // var rectangle_color = canvas.getContext('2d');
    // rectangle.beginPath();
    // rectangle.fillStyle = 'green';
    // rectangle.fillRect(0, 0, 1000, 200);
    // var rectangle_color = path.createLinearGradient(100, 100, 100, 300);
    // // rectangle_color.addColorStop(0.0, 'rgb(0, 255, 255)');
    // // rectangle_color.addColorStop(1.0, 'rgb(253, 182, 7)');
    // // rectangle.fillStyle = rectangle_color;

    PathShape({
      stroke: "magenta",
      strokeWidth: 1,
      paths: [Vector2(this.gridX.span(8), this.gridY.span(16)), 
        Vector2(this.gridX.span(8), this.gridY.span(5))]
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(0), this.gridY.span(16)), 
        Vector2(this.gridX.span(7.5), this.gridY.span(5))]
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(16), this.gridY.span(16)), 
        Vector2(this.gridX.span(8.5), this.gridY.span(5))]
    }).addChildTo(this);


    Label({
      text: "リズム De! 掃除機",
      fill: "white",
      fontSize: 70,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.span(3) + 10)
    .addChildTo(this);


    const playMethodGroup = DisplayElement().setPosition(this.gridX.span(13), this.gridY.span(1)).addChildTo(this);
    const playMethodButton = RectangleShape({
      width: 220,
      height: 80,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
      cornerRadius: 16
    }).addChildTo(playMethodGroup).setInteractive(true);
    Label({
      text: "遊び方",
      fontSize: 48,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(playMethodGroup);
    playMethodButton.onpointstart = function() {
      self.app.pushScene(PlayMethodScene(params));    
    };

    const touchLabelGroup = DisplayElement().setPosition(this.gridX.center(), this.gridY.span(14)- 30).addChildTo(this);
    const nextButton = RectangleShape({
      width: 450,
      height: 150,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 15,
      cornerRadius: 70,
    }).addChildTo(touchLabelGroup).setInteractive(true);

    const touchLabel = Label({
      text: "Tap to start",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(touchLabelGroup);
    touchLabel.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 900)
    .to({alpha: 1}, 900);

    //センサ使用許可要求
    this.setInteractive(true);
    this.onclick = function() {
      devicemotionRequest();
    };

    // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
    //enterイベント自体は1つのみしか発火されていない
    nextButton.on('pointstart', function() {
      var event = "touchstart";
      var dom = self.app.domElement;
      dom.addEventListener(event, (function() {
        return function f() {
          var context = phina.asset.Sound.getAudioContext();
          var buf = context.createBuffer(1, 1, 22050);
          var src = context.createBufferSource();
          src.buffer = buf;
          src.connect(context.destination);
          src.start(0);
          dom.removeEventListener(event, f, false);
        }
      }()), false);
      // シーン遷移
      SoundManager.play('shiningStar');
      self.exit(params);
    });
  },

});

//遊び方画面
phina.define("PlayMethodScene", {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = "black";
    const self = this;
 
    Button({
      text: '戻る',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.span(15))
      .onpush = function() {
        self.exit();    
      };
  },
});