//グローバルに展開
phina.globalize();
phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit(options);
    this.backgroundColor = "white";

    var self = this;
    var gx = this.gridX;
    var gy = this.gridY;
    var AM = phina.asset.AssetManager;

const bgm1 = document.querySelector("#bgm1");
var all_info = 0;
var x = 0,
    y = 0,
    z = 0;
var now_acc_x = 0,
    now_acc_y = 0,
    now_acc_z = 0;
var acc_status;
var threashold_low = 1,
    threathold_high = 4;

    // var beatmap = DEBUG_BEATMAP;
    var beatmap = AM.get('json', 'beatmap').data;

    // タイマーのセット
    this.elapsedTime = 0; // 経過時間
    this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間

    this.totalScore = 0;
    // this.comboNum = 0;

    var main_background = Sprite('main_background').addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center());
      //title_image.height = 781 / 1.7;
      //title_image.width = 968 / 1.7;

    var vacuumcleaner = Sprite('vacuumcleaner').addChildTo(this)
      .setPosition(this.gridX.span(7.7), this.gridY.span(13));
      vacuumcleaner.height = 800;
      vacuumcleaner.width = 600;
    // // 移動する速度
    // vacuumcleaner.speed = 10;
    // // 動かす処理
    // vacuumcleaner.update = function() {
    //     this.y += this.speed;
    //     // 指定範囲からはみ出さないように
    //     if(this.top <= 400) {
    //         this.top = 400;
    //         this.speed *= -1;
    //     } else if(this.bottom >= 420) {
    //         this.bottom = 420;
    //         this.speed *= -1;
    //     }
    // }

    // 時間が来たら音楽流す
    this.one('musicstart', function() {
      SoundManager.playMusic('music', null, false);
    });

    // ユニットアイコンの配置
    var iconGroup = DisplayElement()
    .setPosition(gx.center(), gy.span(2))
    .addChildTo(this);
    for (var i = 0; i < TRACK_NUM; i++) {
      var label = INDEX_TO_KEY_MAP[i].toUpperCase();
      var rad = (i * ICON_INTERVAL_DEGREE).toRadian();
      var icon = UnitIcon(i, label)
      .setPosition(
        0, this.gridY.span(9.3)
      )
      .addChildTo(iconGroup);

      if (navigator.userAgent.match(/iPhone/)) {
        if (DeviceMotionEvent.requestPermission) {
            DeviceMotionEvent.requestPermission().then((permissionState) => {
                if (permissionState === "granted") {

                    window.addEventListener("devicemotion", motion);
                }
            });
        }
    } else {
        if (navigator.userAgent.match(/Android.+Mobile/)) {
            window.addEventListener("devicemotion", motion);
        }
    }
// }

function motion() {
    all_info = event.accelerationIncludingGravity;
    x = all_info.x;
    y = all_info.y;
    z = all_info.z;
    // accer();

    if(y >= 0){
      if(y > threathold_high) {
          music.currentTime = 0;
          acceer();
          //alert(x);
          // bgm1.play();
      }
      meter_plus = document.getElementById("plus"); // データを表示するdiv要素の取得
      meter_plus.value = orgRound(y, 10);
      meter_minus = document.getElementById("minus"); // データを表示するdiv要素の取得
      meter_minus.value = 0;
  }
  else{
      if(y < -threathold_high) {
          music.currentTime = 0;
          self.judge(icon);
      }
      meter_plus = document.getElementById("plus"); // データを表示するdiv要素の取得
      meter_plus.value = 0;
      meter_minus = document.getElementById("minus"); // データを表示するdiv要素の取得
      meter_minus.value = -orgRound(y, 10);
  }
}

function play_init() {
    bgm1.play();
}

      

      //タップ・クリック判定
      icon.onpointstart = function() {
        self.judge(this); // 自分を渡す
      };
    }
    
    // キーボード判定
    this.on('keydown', function(e) {
      var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
      if (keyData !== undefined) {
        console.log(keyData.id);
        console.log(this)
        var icon = iconGroup.getChildAt(keyData.id);
        console.log(icon)
        this.judge(icon);
      }
    });

    // 譜面の展開
    this.markerGroup = DisplayElement()
    .setPosition(iconGroup.x, iconGroup.y)
    .addChildTo(this);
    beatmap.notes.forEach(function(note) {
      TargetMarker(note.targetTime, note.track)
      .addChildTo(self.markerGroup)
    })

    // score表示
    this.scoreLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "black",
      fill: "white",
      strokeWidth: 10,
      fontSize: 70,
    })
    .setPosition(gx.center(), gy.span(3))
    .addChildTo(this)
    .on('enterframe', function() {
      this.text = self.totalScore;
    });

    // リセットボタン
    Button({
      text: 'RESET',
      stroke:"white",
      strokeWidth:10,
      fill: "black",
    })
    .setOrigin(1, 0)
    .setPosition(this.width, 0)
    .addChildTo(this)
    .on('push', function() {
      SoundManager.stopMusic();
      self.exit('main')
    });
  },

  update: function(app) {
    var self = this;
    var ps = app.pointers;
    var kb = app.keyboard;

    // タイマー加算
    this.elapsedTime += app.deltaTime;
    this.gameTime += app.deltaTime;

    // ゲームスタートまでの猶予
    if (this.has('musicstart') && this.elapsedTime > MUSIC_START_DELAY) {
      this.flare('musicstart');
    }

    // マーカー描画
    var markers = this.markerGroup.children;
    markers.forEach(function(m) {
      if (!m.isAwake) return;

      var time = this.gameTime
      var rTime = m.targetTime - time; // 相対時間

      if (rTime < MARKER_APPEARANCE_DELTA) {
        // マーカーの位置比率や縮小率（倍率）を計算する
        // ratioはアイコンに近いほど1.0に近づく
        var ratio = (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
        var distance = BIAS + UNIT_ARRANGE_RADIUS * ratio;

        m.setVisible(true)
        .setPosition(
          m.vector.x * distance,
          m.vector.y * distance
        )
        .setScale(ratio, ratio);
      }

      // miss判定
      if (RATING_TABLE["miss"].range < -rTime) {
        this.reaction(m, "miss");
      }
    }.bind(this));

  },

  // 判定処理
  judge: function(unitIcon) {
    // alert("test");
    var time = this.gameTime;

    // 判定可能マーカーを探索
    var markers = this.markerGroup.children;
    markers.some(function(m) {
      if (!m.isAwake || m.trackId !== unitIcon.id) return;

      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      var delta = Math.abs(m.targetTime - time);
      if (delta <= RATING_TABLE["perfect"].range) {
        unitIcon.fireEffect();
        SoundManager.play('ring');
        this.reaction(m, "perfect");
        return true;
      }
      // if (delta <= RATING_TABLE["great"].range) {
      //   unitIcon.fireEffect();
      //   SoundManager.play('ring');
      //   this.reaction(m, "great");
      //   return true;
      // }
      if (delta <= RATING_TABLE["good"].range) {
        unitIcon.fireEffect();
        SoundManager.play('ring');
        this.reaction(m, "good");
        return true;
      }
      if (delta <= RATING_TABLE["miss"].range) {
        this.reaction(m, "miss");
        return true;
      }
    }.bind(this));

  },

  reaction: function(marker, rating) {
    // マーカー不可視化
    marker.isAwake = false;
    marker.visible = false;

    RateLabel({text: rating.toUpperCase()})
    .setPosition(this.gridX.center(), this.gridY.center())
    .addChildTo(this);

    this.totalScore += RATING_TABLE[rating].score;
  },

});