phina.globalize();

//mainシーン
phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit(options);

    const self = this;
    self_global = self;
    const gx = this.gridX;
    const gy = this.gridY;
    const AM = phina.asset.AssetManager;

    // var beatmap = DEBUG_BEATMAP;
    var beatmap = AM.get('json', 'beatmap').data;
    
    // タイマーのセット
    this.elapsedTime = 0; // 経過時間
    this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間
    //スコア
    this.totalScore = 0;
    this.perfect_times = 0
    this.great_times = 0
    this.good_times = 0
    this.miss_times = 0

    PathShape({
      stroke: "magenta",
      strokeWidth: 1,
      paths: [Vector2(this.gridX.span(8), this.gridY.span(16)), 
        Vector2(this.gridX.span(8), this.gridY.span(4.5))]
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(0), this.gridY.span(16)), 
        Vector2(this.gridX.span(7.5), this.gridY.span(4.5))]
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(16), this.gridY.span(16)), 
        Vector2(this.gridX.span(8.5), this.gridY.span(4.5))]
    }).addChildTo(this);
    
    // ラベル表示
    var aclr_label = Label(orgRound(aclr.y, 10).toString()).addChildTo(this);
    aclr_label.fontSize = 48;
    aclr_label.fill = 'black';
    aclr_label.setPosition(gx.span(2), gy.span(4));
    aclr_label.update = function(){ this.text = orgRound(aclr.y, 10).toString(); }

    // 時間が来たら音楽流す
    this.one('musicstart', function() {
      SoundManager.playMusic('music', null, false);
    });

    // 判定部マーカの表示
    const icon = UnitIcon().setPosition(gx.center(), gy.span(2) + this.gridY.span(MARKER_COODINATE_Y)).addChildTo(this);
    icon_global = icon;
    //タップ判定=最終的に消す
    icon.onpointstart = () => this.judge(icon);

    // 譜面の展開
    this.markerGroup = DisplayElement()
    .setPosition(gx.center(), gy.span(2))
    .addChildTo(this);
    beatmap.notes.forEach((note) => {
      TargetMarker(note.targetTime, this, note.direction)
      .group.addChildTo(this.markerGroup);
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
    .onpointstart=function() {
      SoundManager.stopMusic();
      self.exit('main')
    };

    // 結果画面への遷移ボタン
    Button({
      text: 'RESULT',
      stroke:"white",
      strokeWidth:10,
      fill: "black",
    })
    .setOrigin(1, 0)
    .setPosition(216, 0)
    .addChildTo(this)
    .onpointstart=function() {
      SoundManager.stopMusic();
      self.exit({
        result_score: self.totalScore,
        perfect_times: self.perfect_times,
        great_times: self.great_times,
        good_times: self.good_times,
        miss_times: self.miss_times
      }); // 自分を渡す
    };
  },

  update: function(app) {
    // タイマー加算
    this.elapsedTime += app.deltaTime;
    this.gameTime += app.deltaTime;

    // ゲームスタートまでの猶予
    if (this.has('musicstart') && this.elapsedTime > MUSIC_START_DELAY) {
      this.flare('musicstart');
    }

    // マーカー描画
    const markers = this.markerGroup.children;
    markers.forEach((m) => {
      if (!m.isAwake) return;

      const time = this.gameTime;
      var rTime = m.targetTime - time; // ノーツの出現予定時間 - 音楽再生以降の経過時間

      if (rTime < MARKER_APPEARANCE_DELTA) {
        // マーカーの位置比率や縮小率（倍率）を計算する
        // ratioはアイコンに近いほど1.0に近づく
        const ratio = (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
        const distance = BIAS + UNIT_ARRANGE_RADIUS * ratio;

        m.setVisible(true)
        .setPosition(m.vector.x * distance, m.vector.y * distance)
        .setScale(ratio, ratio);
      }

      // 通りすぎたノーツをmiss判定とする処理
      if (RATING_TABLE["miss"].range < -rTime) {
        this.reaction(m, "miss");
      }
    });
  },

  // 判定処理
  judge: function(unitIcon) {
    const time = this.gameTime;

    // 判定可能マーカーを探索
    const markers = this.markerGroup.children;
    markers.some((m) => {
      if (!m.isAwake) return;
      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      const delta = Math.abs(m.targetTime - time);
      if (delta <= RATING_TABLE["perfect"].range) {
        unitIcon.fireEffect();
        SoundManager.play('hit');
        this.reaction(m, "perfect");
        this.perfect_times += 1;
        return true;
      }
      if (delta <= RATING_TABLE["great"].range) {
        unitIcon.fireEffect();
        SoundManager.play('hit');
        this.reaction(m, "great");
        this.great_times += 1;
        return true;
      }
      if (delta <= RATING_TABLE["good"].range) {
        unitIcon.fireEffect();
        SoundManager.play('hit');
        this.reaction(m, "good");
        this.good_times += 1;
        return true;
      }
      if (delta <= RATING_TABLE["miss"].range) {
        this.reaction(m, "miss");
        this.miss_times += 1;
        return true;
      }
    });
  },

  //判定処理結果表示関数
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