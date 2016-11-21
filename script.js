onload = function() {
        var canvas = document.getElementById('canvas');
        canvas.width = 500;
        canvas.height = 300;
        
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
};

       //minMatrix.js を用いた行列関連処理
       //matIVオブジェクトを生成
       var m = new matIV();
       
       //各種行列の生成と初期化
       var wMatrix = m.identity(m.create());
       var vMatrix = m.identity(m.create());
       var pMatrix = m.identity(m.create());
       var vpMatrix = m.identyty(m.create());
       var wvpMatrix = m.identity(m.create());

       // ビュー×プロジェクション座標変換行列
       m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix); //カメラ位置　注視点　上方向
       m.perspective(45, c.width / c.height, 0.1, 100, pMatrix); //画角 アスペクト比,近クリップ面,遠方クリップ面
       m.multiply(pMatrix, vMatrix, vpMatrix);

       // カウンタを元にラジアンを算出
       var rad = (count % 360) * Math.PI / 180;

       //モデルはY軸を中心に回転
       m.identity(wMatrix);
       m.translate(wMatrix, [1.0, -1.0, 0.0], wMatrix);
       m.rotate(wMatrix, rad, [0, 1, 0], wMatrix);

       //モデルの座標返還行列をｓ完成あせレンダリングする
       m.multiply(vpMatrix, wMatrix, wvpMatrix);
       gl.uniformMatrix4fv(uniLocation, false, wvpMatrix);
       gl.drawArrays(gl.TRAIANGLES, 0, 3);
