/**
 * タイトル
 */
 phina.globalize();

 phina.define('TitleScene', {
    superClass: 'phina.display.DisplayScene',
  
    init: function(params) {
      this.superInit(params);
      this.backgroundColor = params.backgroundColor;
  
      CircleShape({
        radius: 250,
        padding: 10,
        //backgroundColor:"pink",
        fill:"#191970",
        stroke:"white",
        strokeWidth:10,
        //shadow:"yellow",
        //shadowBlur:100
      }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(8));

      // タイトルラベル
      Label({
        text: "リズム De! 掃除機",
        fill: "white",
        stroke: "#0000ff",
        strokeWidth: 6,
        fontSize: 70,
      })
      .setPosition(this.gridX.center(), this.gridY.span(2))
      .addChildTo(this)
  
      var touchLabel = Label({
        text: "Tap to start",
        fill: "white",
        stroke: "#0000ff",
        strokeWidth: 6,
        fontSize: 45,
      })
      .setPosition(this.gridX.center(), this.gridY.span(8))
      .addChildTo(this);
  
      // 明滅させる
      touchLabel.tweener.clear()
      .setLoop(true)
      .to({alpha: 0}, 900)
      .to({alpha: 1}, 900)
      ;

      // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
      this.on('enter', function() {
        var event = "touchstart";
        var dom = this.app.domElement;
        deviceMotionRequest();
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
          this.exit();
        });
      });
  
    },
  
  });