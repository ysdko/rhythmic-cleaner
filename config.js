//画面サイズ(固定)
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 1060;
//　ノーツが落ちてくる角度
const UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.77;
const BIAS = 130;

//　検出部マーカのパラメータ
const MARKER_RADIUS = 70;
const MARKER_STROKE_WIDTH = 8;
const MARKER_COODINATE_Y = 9.3;

// ノーツ出現時間(ms)
const MARKER_APPEARANCE_DELTA = 1000;
//　開始時音楽再生までの時間
const MUSIC_START_DELAY = 2000;

// 採点基準
const RATING_TABLE = {
  perfect: {
    score: 1000,
    range: 34, //ms
  },
  great: {
    score: 500,
    range: 64, //ms
  },
  good: {
    score: 100,
    range: 90, //ms
  },
  miss: {
    score: 0,
    range: 134, //ms
  },
};

const MAX_SCORE = {
  shiningStar: 109192,
  catlife: 299153,
  hyakkaryouran: 330068
}

// 読み取られた加速度の値
let aclr = {
  x : 0,
  y : 0,
  z : 0
}
// 判定時の加速度の値
let nowDirection = 0;
// 判定する加速度の閾値
const THREATHOLD = 0.4;
// タッチかスライドかのフラグ
let flagTorS = 'Touch'; // Slide
// デバイスの種類
let DEVICE = 'iPhone';

// オブジェクト参照用
var self_global;
var icon_global;
var params_global;

//背景の透明度
const ALPHA = 0.8;

const ASSETS = {
  image: {
    twitter_logo: "./tools/twitter_logo.png",
    garbage: "./tools/grbg.png",
    vacume: "./tools/vacume.png",
    logo: "./tools/logoC.png",
    bg: "./tools/bg2.png",
  },
  sound: {
    point: "./tools/point.mp3",
    shiningStar: "./tools/shiningStar.mp3",
    catlife: "./tools/catlife.mp3",
    hyakkaryouran: "./tools/hyakkaryouran.mp3",
    hit: "./tools/tamborine.mp3",
  },
  json: {
    shiningStar: "./tools/shiningStar.json",
    catlife: "./tools/catlife.json",
    hyakkaryouran: "./tools/hyakkaryouran.json",
  }
};
