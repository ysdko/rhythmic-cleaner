phina.globalize();

//mainシーン
phina.define("MainScene", {
  superClass: "DisplayScene",

  init: function (options) {
    this.superInit(options);
    const music = options.music;
    const self = this;
    const gx = this.gridX;
    const gy = this.gridY;
    const AM = phina.asset.AssetManager;
    // var beatmap = DEBUG_BEATMAP;
    const beatmap = AM.get("json", music).data;
    self_global = self;

    // タイマーのセット
    this.elapsedTime = 0; // 経過時間
    this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間
    //スコア
    this.totalScore = 0;
    this.perfect_times = 0;
    this.great_times = 0;
    this.good_times = 0;
    this.miss_times = 0;
    //コンボ
    this.combo = 0;


    bg = Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = ALPHA;


    PathShape({
      stroke: "magenta",
      strokeWidth: 1,
      paths: [
        Vector2(this.gridX.span(8), this.gridY.span(16)),
        Vector2(this.gridX.span(8), this.gridY.span(4.5)),
      ],
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [
        Vector2(this.gridX.span(0), this.gridY.span(16)),
        Vector2(this.gridX.span(7.5), this.gridY.span(4.5)),
      ],
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [
        Vector2(this.gridX.span(16), this.gridY.span(16)),
        Vector2(this.gridX.span(8.5), this.gridY.span(4.5)),
      ],
    }).addChildTo(this);
    PathShape({
      stroke: "magenta",
      strokeWidth: 5,
      paths: [
        Vector2(0, gy.span(2) + this.gridY.span(MARKER_COODINATE_Y)),
        Vector2(this.gridX.width, gy.span(2) + this.gridY.span(MARKER_COODINATE_Y)),
      ],
    }).addChildTo(this);


    this.gauge = Gauge({
      x: this.gridX.center(), y: this.gridY.span(2),
      width: 400,
      height: 30,
      cornerRadius: 10,
      maxValue: MAX_SCORE[music] * 0.8,
      value: 0,
      fill: 'white',
      gaugeColor: 'cyan',
      stroke: 'silver',
      strokeWidth: 5,
    }).addChildTo(this).on("enterframe", function () {
      this.value = self.totalScore;
    });


    vacume = Sprite('vacume').addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(14.7));
    vacume.width = 500;
    vacume.height = 300;


    // 時間が来たら音楽流す
    this.one("musicstart", function () {
      SoundManager.playMusic(music, null, false);
    });


    // 判定部マーカの表示
    const icon = UnitIcon()
      .setPosition(
        gx.center(),
        gy.span(2) + this.gridY.span(MARKER_COODINATE_Y)
      )
      .addChildTo(this);
    icon_global = icon;
    //タップ判定=最終的に消す
    icon.onpointstart = () => {
      flagTorS = 'Touch';
      this.judge(icon);
    }


    // 譜面の展開
    this.markerGroup = DisplayElement()
      .setPosition(gx.center(), gy.span(2))
      .addChildTo(this);
    beatmap.notes.forEach((note) => {
      TargetMarker(note.targetTime, note.direction).group.addChildTo(
        this.markerGroup
      );
    });


    // score表示
    this.scoreLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "cyan",
      fill: "white",
      strokeWidth: 10,
      fontSize: 70,
    })
      .setPosition(gx.center(), gy.span(3))
      .addChildTo(this)
      .on("enterframe", function () {
        self.totalScore = Math.round(self.totalScore);
        this.text = self.totalScore;
      });


    // combo表示
    this.comboLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "cyan",
      fill: "white",
      strokeWidth: 10,
      fontSize: 70,
    })
      .setPosition(gx.span(13), gy.span(6))
      .addChildTo(this)
      .on("enterframe", function () {
        this.text = self.combo;
      });
    this.comboview = Label({
      text: "COMBO",
      textAlign: "center",
      stroke: "black",
      fill: "white",
      strokeWidth: 10,
      fontSize: 40,
    })
      .setPosition(gx.span(13), gy.span(7))
      .addChildTo(this);


    // 加速度表示(デバッグ用)
    var aclr_label = Label(orgRound(aclr.y, 10).toString()).addChildTo(this);
    aclr_label.fontSize = 48;
    aclr_label.fill = "white";
    aclr_label.setPosition(gx.span(2), gy.span(4));
    aclr_label.update = function () {
      this.text = orgRound(aclr.y, 10).toString();
    };


    // ポーズボタン
    Button({
      text: "PAUSE",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    })
      .addChildTo(this)
      .setOrigin(1, 0)
      .setPosition(this.width, 0).onpush = function () {
      SoundManager.pauseMusic();
      // ポーズシーンをpushする
      self.app.pushScene(MyPauseScene());
    };


    // 結果画面への遷移ボタン
    Button({
      text: "RESULT",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    })
      .setOrigin(1, 0)
      .setPosition(216, 0)
      .addChildTo(this).onpointstart = function () {
      SoundManager.stopMusic();
      self.exit({
        result_score: self.totalScore,
        perfect_times: self.perfect_times,
        great_times: self.great_times,
        good_times: self.good_times,
        miss_times: self.miss_times,
        music_title: music
      }); // 自分を渡す
    };
  },


  update: function (app) {
    // タイマー加算
    this.elapsedTime += app.deltaTime;
    this.gameTime += app.deltaTime;

    // ゲームスタートまでの猶予
    if (this.has("musicstart") && this.elapsedTime > MUSIC_START_DELAY) {
      this.flare("musicstart");
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
        const ratio =
          (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) /
          MARKER_APPEARANCE_DELTA;
        const distance = BIAS + UNIT_ARRANGE_RADIUS * ratio;

        m.setVisible(true)
          .setPosition(m.vector.x * distance, m.vector.y * distance)
          .setScale(ratio, ratio);
      }

      // 通りすぎたノーツをmiss判定とする処理
      if (RATING_TABLE["miss"].range < -rTime) {
        this.reaction(m, "miss");
        this.miss_times += 1;
        this.combo = 0;
        //スコアの最大値の算出
        // this.totalScore *= 1.1;
        // this.totalScore += RATING_TABLE["perfect"].score;
    
      }
    });
  },

  // 判定処理
  judge: function (unitIcon) {
    const time = this.gameTime;

    // 判定可能マーカーを探索
    const markers = this.markerGroup.children;
    markers.some((m) => {
      if (!m.isAwake) return;
      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      const delta = Math.abs(m.targetTime - time);
      if (delta <= RATING_TABLE["perfect"].range 
        && (flagTorS === 'Touch' 
          || flagTorS === 'Slide' 
            && (m.direction === nowDirection))) {
        unitIcon.fireEffect();
        SoundManager.play("hit");
        this.reaction(m, "perfect");
        this.perfect_times += 1;
        this.combo_func();
        return true;
      }
      if (delta <= RATING_TABLE["great"].range
        && (flagTorS === 'Touch' 
          || flagTorS === 'Slide' 
            && (m.direction === nowDirection))) {
        unitIcon.fireEffect();
        SoundManager.play("hit");
        this.reaction(m, "great");
        this.great_times += 1;
        this.combo_func();
        return true;
      }
      if (delta <= RATING_TABLE["good"].range
        && (flagTorS === 'Touch' 
          || flagTorS === 'Slide' 
            && (m.direction === nowDirection))) {
        unitIcon.fireEffect();
        SoundManager.play("hit");
        this.reaction(m, "good");
        this.good_times += 1;
        this.combo_func();
        return true;
      }
      if (delta <= RATING_TABLE["miss"].range
        && (flagTorS === 'Touch' 
          || flagTorS === 'Slide' 
            && (m.direction === nowDirection))) {
        this.reaction(m, "miss");
        this.miss_times += 1;
        this.combo = 0;
        return true;
      }
    });
  },

// bonusエフェクトの表示
  combo_func: function () {
    this.combo += 1;
    if (this.combo > 1) {
      this.totalScore *= 1.1;
      RateLabel({ text: "bonus ×1.1", fontSize: 40 })
        .setPosition(this.gridX.center(), this.gridY.span(4))
        .addChildTo(this);
    }
  },

  //判定処理結果表示関数
  reaction: function (marker, rating) {
    // マーカー不可視化
    marker.isAwake = false;
    marker.visible = false;

    RateLabel({ text: rating.toUpperCase(), fontSize: 60 })
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);

      this.totalScore += RATING_TABLE[rating].score;
  },
});

phina.define("MyPauseScene", {
  superClass: "DisplayScene",
  init: function () {
    this.superInit(params_global);
    this.backgroundColor = "rgba(0, 0, 0, 0.7)";
    const self = this;

    Button({
      text: "再開する",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    }).addChildTo(this)
    .setPosition(this.gridX.center(), this.gridY.center())
    .onpush = function () {
        SoundManager.resumeMusic();
        self.exit();
    };
  },
});