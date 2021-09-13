phina.globalize();

// 四捨五入関数
function orgRound(value, base) {
    return Math.round(value * base) / base;
}

// 加速度をキャッチする関数
function motionCatch(event) {
    aclr = event.accelerationIncludingGravity; //event.acceleration
    aclr.x = temp.x;
    aclr.y = temp.y;
    aclr.z = temp.z;
}

// 加速度を更新する周期の設定
timer = window.setInterval(displayData, 33);

// 加速度を表示する関数
function displayData() {
    if(aclr.y > THREATHOLD || aclr.y < -THREATHOLD)
        self_global.judge(icon_global);
}