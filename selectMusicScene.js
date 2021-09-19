phina.globalize();

phina.define('SelectMusicScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    const self = this;
    var music = "";
    const num = [];
    const labels = [];
    const lines = [];
    let selectFlag = false;
    let circleY = 0;
    self.count = 0;

    function set(nowNum) {
      selectFlag = true;
      self.circleLeft.stroke = "magenta";
      self.circleRight.stroke = "magenta";
      nextLabel.fill = "white";
      SoundManager.stopMusic();
      for(var i=0; i<3; i++){
        if(i === nowNum) {
          num[i].fill = "white";
          labels[i].fill = "white";
          lines[i].stroke = "magenta";
        }
        else{
          num[i].fill = "gray";
          labels[i].fill = "gray";
          lines[i].stroke = "purple";
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

    Label({
      text: "曲を選択して下さい",
      fill: "white",
      fontSize: 60,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.span(1.8))
    .addChildTo(this);

    const circleGroup = DisplayElement().addChildTo(this);
    self.circleLeft = CircleShape({
      fill: null,
      stroke: null,
      strokeWidth: 5,
      radius: 30,
    }).addChildTo(circleGroup).setPosition(50, 0);
    self.circleRight = CircleShape({
      fill: null,
      stroke: null,
      strokeWidth: 5,
      radius: 30,
    }).addChildTo(circleGroup).setPosition(590, 0);
    circleGroup.tweener.clear()
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
      fill: 'black',
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, -150).setInteractive(true);
    num.push(Label({
      text: "1.",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, -150));
    labels.push(Label({
      text: "Shining Star",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, -150));
    lines.push(PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, -100), 
        Vector2(230, -100)]
    }).addChildTo(songGroup));
    point1.on("pointstart", function() {   
      set(0);
    });

    const point2 = RectangleShape({
      width: 400,
      height: 100,
      fill: 'black',
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 0).setInteractive(true);
    num.push(Label({
      text: "2.",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 0));
    labels.push(Label({
      text: "Cat life",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, 0));
    labels[1].setInteractive(true);
    lines.push(PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, 50), 
        Vector2(230, 50)]
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
      fill: 'black',
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 150).setInteractive(true);
    num.push(Label({
      text: "3.",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 150));
    labels.push(Label({
      text: "百花繚乱",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(40, 150));
    labels[2].setInteractive(true);
    lines.push(PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, 200), 
        Vector2(230, 200)]
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
      SoundManager.play('point');
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
      text: '曲選択に戻る',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(1))
      .onpush = function() {
        self.exit();    
      };
  },
});