phina.globalize();

//加速度センサ使用認証
function devicemotionRequest() {
    if (navigator.userAgent.match(/iPhone/)) {
        if (DeviceMotionEvent.requestPermission) {
            DeviceMotionEvent.requestPermission().then((permissionState) => {
                if (permissionState === "granted") {
                    DEVICE = 'iPhone';
                    window.addEventListener("devicemotion", function(event){ motionCatch(event) });
                }
            }).catch((e) => {alert(e);});
        }
    } else {
        if (navigator.userAgent.match(/Android.+Mobile/)) {
            DEVICE = 'Android';
            // 直接motionCatch(event)とはできない
            window.addEventListener("devicemotion", function(event){ motionCatch(event) });
        }
    }
}

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

// 判定する周期の設定
timer = window.setInterval(displayData, 33);

// 加速度を表示する関数
function displayData() {
    const nowAclr = aclr;
    if (nowAclr.y > THREATHOLD) {
        if (DEVICE === 'iPhone')
            flagTorS = 'SlideBack';
        else
            flagTorS = 'SlideFront';
        self_global.judge(icon_global);
    }
    if (nowAclr.y < -THREATHOLD) {
        if (DEVICE === 'iPhone')
            flagTorS = 'SlideFront';
        else  
            flagTorS = 'SlideBack';
        self_global.judge(icon_global);
    }
}