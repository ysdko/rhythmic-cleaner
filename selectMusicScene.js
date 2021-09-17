phina.globalize();

phina.define('SelectMusicScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    const self = this;
    let music, musicClock;
    var labels = [0,0,0];
    const selectFlag = 0;

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
    labels[0] = Label({
      text: "1. Shining Star",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(0, -150);
    labels[0].setInteractive(true);
    const path1 = PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, -100), 
        Vector2(230, -100)]
    }).addChildTo(songGroup);
    Label({
      text: "2. Shining Star",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup);
    labels[1].setInteractive(true);
    const path2 = PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, 50), 
        Vector2(230, 50)]
    }).addChildTo(songGroup);
    labels[2] = Label({
      text: "3. Shining Star",
      fontSize: 52,
      fill: "gray",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(0, 150);
    labels[3].setInteractive(true);
    const path3 = PathShape({
      stroke: "purple",
      strokeWidth: 5,
      paths: [Vector2(-230, 200), 
        Vector2(230, 200)]
    }).addChildTo(songGroup);

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
      SoundManager.play('title_music');
      self.exit({
        music: music,
        musicClock: musicClock,
      });
    };
    Label({
      text: "OK",
      fontSize: 60,
      fill: "white",
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
      SoundManager.play('title_music');
      self.app.pushScene(TitleScene(params));  
    };
    Label({
      text: "戻る",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(prevButtonGroup);

  },

  // update: function(){
  //   if(nowLabel === 1){
  //     label1.fill = "magenta";
  //     label2.fill = "purple";
  //     label3.fill = "purple";
  //     path1.stroke = 1;
  //     path1.strokeWidth= 10;
  //   }
  //   else if(nowLabel === 2){
  //     label1.fill = "purple";
  //     label2.fill = "magenta";
  //     label3.fill = "purple";
  //   }
  //   else if(nowLabel === 3){
  //     label1.fill = "purple";
  //     label2.fill = "purple";
  //     label3.fill = "magenta";
  //   }

  // }

});