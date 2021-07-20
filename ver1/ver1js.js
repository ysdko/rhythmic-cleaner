window.addEventListener("deviceorientation", (dat) => {

    alpha    = dat.alpha;
    beta     = dat.beta;
    gamma    = dat.gamma;

    displayData();

}, false);

function displayData() {
    var txt = document.getElementById("txt");   // データを表示するdiv要素の取得
    txt.innerHTML = "alpha: " + alpha + "<br>"  // x軸の値
                  + "beta:  " + beta  + "<br>"  // y軸の値
                  + "gamma: " + gamma;          // z軸の値
}