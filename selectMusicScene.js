phina.globalize();

phina.define('SelectMusicScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    const self = this;
    var music = "";
    const labels = [];
    const lines = [];
    let selectFlag = false;

    function set(num) {
      selectFlag = true;
      nextLabel.fill = "white";
      for(var i=0; i<3; i++){
        if(i === num) {
          labels[i].fill = "white";
          lines[i].stroke = "magenta";
        }
        else{
          labels[i].fill = "gray";
          lines[i].stroke = "purple";
        }
      }
      if(num === 0)
        music = "shiningStar";
      else if(num === 1)
        music = "catlife";
      else
        music = "hyakkaryouran";
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

    const songGroup = DisplayElement().setPosition(this.gridX.center(), this.gridY.span(7.3)).addChildTo(this);
    RectangleShape({
      width: 500,
      height: 500,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
    }).addChildTo(songGroup);

    labels.push(Label({
      text: "1. Shining Star",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(0, -150));
    labels[0].setInteractive(true);
    lines.push(PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, -100), 
        Vector2(230, -100)]
    }).addChildTo(songGroup));
    labels[0].on("pointstart", function() {   
      set(0);
    });

    labels.push(Label({
      text: "2. Cat life",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup));
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
    
    labels.push(Label({
      text: "3. 百花繚乱",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(0, 150));
    labels[2].setInteractive(true);
    lines.push(PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, 200), 
        Vector2(230, 200)]
    }).addChildTo(songGroup));
    labels[2].on("pointstart", function() {   
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