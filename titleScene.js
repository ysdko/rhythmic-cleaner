phina.globalize();

phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = params.backgroundColor;
    SoundManager.volume = 0.15;
    SoundManager.musicVolume = 0.15;

    Label({
      text: "リズム De! 掃除機",
      fill: "white",
      fontSize: 55,
    })
    .setPosition(this.gridX.center(), this.gridY.span(4))
    .addChildTo(this);

    playMethod = RectangleShape({
      width: 220,
      height: 80,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
      cornerRadius: 16
    }).addChildTo(this).setPosition(this.gridX.span(13), this.gridY.span(1));

    const touchLabel = Label({
      text: "Tap to start",
      fill: "black",
      stroke: "#0000ff",
      strokeWidth: 6,
      fontSize: 50,
    })
    .setPosition(this.gridX.center(), this.gridY.span(13))
    .addChildTo(this);
    
    touchLabel.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 900)
    .to({alpha: 1}, 900);

    // const title_image = Sprite('title_image').addChildTo(this)
    // .setPosition(this.gridX.center(), this.gridY.span(7.5));
    // title_image.height = 781 / 1.7;
    // title_image.width = 968 / 1.7;

    //センサ使用許可要求
    this.setInteractive(true);
    this.onclick = function() {
      devicemotionRequest();
    };

    // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
    //enterイベント自体は1つのみしか発火されていない
    this.on('enter', function() {
      var event = "touchstart";
      var dom = this.app.domElement;
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
      this.on('pointend', function() {
        SoundManager.play('title_music');
        this.exit();
      });
    });
  },

});