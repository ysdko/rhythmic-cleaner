

    // // for ios13
    requestPermission = ()=> {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        alert('test'); 
      
      DeviceOrientationEvent.requestPermission().then(response => {
        
        console.log(response)
        
        if (response === 'denied') { 
          window.addEventListener("deviceorientation", test);
          //alert(response);
        }
      }).alert(response);
    }
    };
  
    test=()=> {
      if( window.DeviceOrientationEvent ){
        //. iOS13 以上であれば DeviceOrientationEvent.requestPermission 関数が定義されているので、ここで条件分岐
        if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){
          // alert("testtest")
          //. iOS 13 以上の場合、
          //. 画面上部に「センサーの有効化」ボタンを追加
          var body = document.body;
          var banner = '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
          $('body').prepend( banner );
        }else{
          //. Android または iOS 13 未満の場合、
          //. DeviceOrientationEvent オブジェクトが有効な場合のみ、deviceorientation イベント発生時に deviceOrientaion 関数がハンドリングするよう登録
          window.addEventListener( "deviceorientation", deviceOrientation );
        }
      }
      
    }

    function ClickRequestDeviceSensor(){
      //. ユーザーに「許可」を求めるダイアログを表示
      DeviceOrientationEvent.requestPermission().then( function( response ){
        alert(response);
        if( response === 'granted' ){
          //. 許可された場合のみイベントハンドラを追加できる
          window.addEventListener( "deviceorientation", deviceOrientation );
          //. 画面上部のボタンを消す
          //$('#sensorrequest').css( 'display', 'none' );
        }
      }).catch( function( e ){
        console.log( e );
      });
    }
test=()=>{
      //. DeviceOrientationEvent オブジェクトが有効な環境か？　をチェック
      $('#button1').click(function () {
        $('#div1').css("background-color", "red");
    });
  
  
    // <!--- button2 の click 時の処理 --->
  
    $('#button2').click(function () {
        $('#div1').css("background-color", "green");
    });
  
  
    // <!--- button3 の click 時の処理 --->
  
    $('#button3').click(function () {
        $('#div1').css("background-color", "blue");
    });
  
}