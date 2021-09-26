phina.globalize();

phina.define('SelectMusicScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    const self = this;
    let music = "";
    const num = [];
    const labels = [];
    const lines = [];
    let selectFlag = false;
    let circleY = 0;
    self.count = 0;
    this.mode = 'normal';

    function set(nowNum) {
      self.mode = 'normal';
      self.circleRightText.text = '易';
      self.circleRight.stroke = 'cyan';
      self.circleRightText.stroke = "cyan";
      selectFlag = true;
      circleGroup.visible = true;
      nextLabel.fill = "white";
      SoundManager.stopMusic();
      for(var i=0; i<3; i++){
        if(i === nowNum) {
          num[i].fill = "white";
          labels[i].fill = "white";
          lines[i].stroke = "cyan";
        }
        else{
          num[i].fill = "white";
          labels[i].fill = "white";
          lines[i].stroke = "darkcyan";
        }
      }

      if(nowNum === 0)
        circleY = 335;
      else if(nowNum === 1)
        circleY = 485;
      else 
        circleY = 635;
      circleGroup.setPosition(0, circleY);

      if(nowNum === 0)
        music = "shiningStar";
      else if(nowNum === 1)
        music = "catlife";
      else
        music = "hyakkaryouran";
      SoundManager.playMusic(music, null, false);
    }

    function setMode() {
      SoundManager.play('select');
      if (self.mode === 'normal') {
        self.mode = 'hard';
        self.circleRightText.text = '難';
        self.circleRight.stroke = 'magenta';
        self.circleRightText.stroke = "magenta";
      }
      else {
        self.mode = 'normal';
        self.circleRightText.text = '易';
        self.circleRight.stroke = 'cyan';
        self.circleRightText.stroke = "cyan";
      }
    }

    bg = Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = ALPHA;

    Label({
      text: "曲・難易度を\n選択して下さい",
      fill: "white",
      fontSize: 60,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.span(2))
    .addChildTo(this);

    const circleGroup = DisplayElement().setVisible(false).addChildTo(this);
    self.circleLeft = Sprite('logo').setPosition(60, 0)
    .addChildTo(circleGroup).setScale(0.35, 0.35);
    self.circleRight = RectangleShape({
      width: 80,
      height: 80,
      fill: null,
      stroke: 'cyan',
      strokeWidth: 5,
    }).addChildTo(circleGroup).setPosition(580, 0).setInteractive(true);
    self.circleRight.on("pointstart", function() {   
      setMode();
    });
    self.modeLabel = Label({
      text: "難易度",
      fill: "white",
      fontSize: 33,
      stroke: "cyan",
      strokeWidth: 2,
    }).addChildTo(circleGroup).setPosition(580, -63);
    self.circleRightText = Label({
      text: "易",
      fill: "white",
      fontSize: 50,
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(circleGroup).setPosition(580, 0);
    self.circleLeft.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 900)
    .to({alpha: 1}, 900);

    const songGroup = DisplayElement().setPosition(this.gridX.center(), this.gridY.span(7.3)).addChildTo(this);
    PathShape({
      stroke: "cyan",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(-8), this.gridY.span(-3.7)), 
        Vector2(this.gridX.span(8), this.gridY.span(-3.7))]
    }).addChildTo(songGroup);
    PathShape({
      stroke: "cyan",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(-8), this.gridY.span(4.0)), 
        Vector2(this.gridX.span(8), this.gridY.span(4.0))]
    }).addChildTo(songGroup);

    const point1 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, -150).setInteractive(true);
    num.push(Label({
      text: "1.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, -150));
    labels.push(Label({
      text: "Shining Star",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, -150));
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, -100), 
        Vector2(200, -100)]
    }).addChildTo(songGroup));
    point1.on("pointstart", function() {   
      set(0);
    });

    const point2 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 0).setInteractive(true);
    num.push(Label({
      text: "2.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 0));
    labels.push(Label({
      text: "Cat life",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, 0));
    labels[1].setInteractive(true);
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, 50), 
        Vector2(200, 50)]
    }).addChildTo(songGroup));
    labels[1].on("pointstart", function() {   
      set(1);
    });
    point2.on("pointstart", function() {   
      set(1);
    });
    
    const point3 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 150).setInteractive(true);
    num.push(Label({
      text: "3.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 150));
    labels.push(Label({
      text: "百花繚乱",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(40, 150));
    labels[2].setInteractive(true);
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, 200), 
        Vector2(200, 200)]
    }).addChildTo(songGroup));
    point3.on("pointstart", function() {   
      set(2);
    });

    const nextButtonGroup = DisplayElement().setPosition(this.gridX.span(12) - 20, this.gridY.span(14)- 30).addChildTo(this);
    const nextButton = RectangleShape({
      width: 240,
      height: 100,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
    }).addChildTo(nextButtonGroup);
    nextButton.setInteractive(true);
    nextButton.onpointstart = function() {
      if(selectFlag){
        SoundManager.stopMusic();
        SoundManager.play('point');
        self.exit({
          music: music,
          mode: self.mode,
        });
      }
      else{
        self.app.pushScene(pauseScene());
      }
    };
    const nextLabel = Label({
      text: "OK",
      fontSize: 60,
      fill: "gray",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(nextButtonGroup);

    const prevButtonGroup = DisplayElement().setPosition(this.gridX.span(4) + 20, this.gridY.span(14)- 30).addChildTo(this);
    const prevButton = RectangleShape({
      width: 240,
      height: 100,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
    }).addChildTo(prevButtonGroup);
    prevButton.setInteractive(true);
    prevButton.onpointstart = function() {
      SoundManager.stopMusic();
      SoundManager.play('back');
      self.exit({nextLabel: 'title'});
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

phina.define("pauseScene", {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    this.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    const self = this;
    
    Label({
      text: "開始するには曲を選択して下さい",
      fill: "white",
      fontSize: 35,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.center(-1))
    .addChildTo(this);

    Button({
      width: 270,
      text: "曲選択に戻る",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    }).addChildTo(this)
    .setPosition(this.gridX.center(), this.gridY.center(1))
    .onpush = function () {
        self.exit();
    };
  },
});