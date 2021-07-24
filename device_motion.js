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


//音楽の読み込み
var music = new Audio();

//加速度センサ使用認証
function deviceMotionRequest() {
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
}

function motion() {
    all_info = event.accelerationIncludingGravity;
    x = all_info.x;
    y = all_info.y;
    z = all_info.z;
}

function play_init() {
    bgm1.play();
}

// 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
    var timer = window.setInterval(() => {
    displayData(); // displayData 関数を実行
}, 33); // 33msごとに（1秒間に約30回）

//四捨五入関数
function orgRound(value, base) {
    return Math.round(value * base) / base;
}

// データを表示する displayData 関数
function displayData() {
    var txt = document.getElementById("txt"); // データを表示するdiv要素の取得

    txt.innerHTML =
        "x方向: " +
        orgRound(x, 10) +
        "<br>" + // x軸の値
        "y方向: " +
        orgRound(y, 10) +
        "<br>" + // y軸の値
        "z方向: " +
        orgRound(z, 10); // z軸の値

    //メータで表示
    if(y >= 0){
        if(y > threathold_high) {
            music.currentTime = 0;
            this.judge(this);
            bgm1.play();
        }
        meter_plus = document.getElementById("plus"); // データを表示するdiv要素の取得
        meter_plus.value = orgRound(y, 10);
        meter_minus = document.getElementById("minus"); // データを表示するdiv要素の取得
        meter_minus.value = 0;
    }
    else{
        if(y < -threathold_high) {
            music.currentTime = 0;
            //music.play();  // 再生
            this.judge(this);
            bgm1.play()

        }
        meter_plus = document.getElementById("plus"); // データを表示するdiv要素の取得
        meter_plus.value = 0;
        meter_minus = document.getElementById("minus"); // データを表示するdiv要素の取得
        meter_minus.value = -orgRound(y, 10);
    }

    //閾値処理
    if(y >= -threashold_low && y <= threashold_low){
        acc_status = "status_stop";
    }
    else if(y >= -threathold_high && y < -threashold_low){
        acc_status = "status_minuslow";
    }
    else if(y < -threathold_high){
        acc_status = "status_minushigh";
    }
    else if(y <= threathold_high && y > threashold_low){
        acc_status = "status_pluslow";
    }
    else if(y > threathold_high){
        acc_status = "status_plushigh";
    }

    // statusの表示
    var temp_status = document.getElementById("acc_status"); // データを表示するdiv要素の取得
    temp_status.innerHTML = acc_status;
        
}