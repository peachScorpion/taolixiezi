/*jslint browser: true, bitwise: true, continue: true */
(function () {
    'use strict';

    // http://ja.wikipedia.org/wiki/Xorshift
    function xor128(x, y, z, w) {
        x = x || 123456789;
        y = y || 362436069;
        z = z || 521288629;
        w = w || 88675123;

        return function () {
            var t = x ^ (x << 11);
            x = y;
            y = z;
            z = w;
            w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));
            return w;
        };
    }

    window.canvas = document.getElementsByTagName('canvas')[1];
    window.ctx = window.canvas.getContext('2d');

    // メインループ
    setInterval(function () {
        var scale, grad, i, j, p, x, y, z, w, a, tmp,
            canvas = window.canvas,
            ctx = window.ctx,
            PI2 = Math.PI * 2,
            t = new Date() / 1000,
            random = xor128(),

            // 回転量
            r1 = t, r2 = 2.4, r3 = t * 0.2,
            r1c = Math.cos(r1), r1s = Math.sin(r1),
            r2c = Math.cos(r2), r2s = Math.sin(r2);

        // キャンバスの中央に描画するようにする
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        scale = Math.max(canvas.width, canvas.height);
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.scale(scale, scale);

        // 背景描画
        grad = ctx.createLinearGradient(-1, -2, 1, 2);
        grad.addColorStop(0.0, 'hsl(' + ((t * 5 + 90) % 360 | 0) + ',80%,50%)');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1.0, 'hsl(' + (t * 5 % 360 | 0) + ',80%,50%)');
        ctx.fillStyle = grad;
        ctx.fillRect(-0.5, -0.5, 1, 1);

        ctx.rotate(r3 % PI2);
        for (i = 0; i < 360; i += 1) {
            // 座標を決める
            p = random();
            x = (p & 0xff) / 128 - 1;
            y = (p >>> 8 & 0xff) / 128 - 1;
            z = (p >>> 16 & 0xff) / 128 - 1;
            w = (p >>> 24 & 0xff) / 256;

            // Z座標を時間によって移動する
            z += t * 0.5;
            z = (z + 1) % 2 - 1;

            // 透明度を決める
            a = (z + 1) * 0.5;
            if (a < 0.9) {
                ctx.globalAlpha = a / 0.9;
            } else {
                a -= 0.9;
                ctx.globalAlpha = 1 - a / 0.1;
            }

            // Z軸回転
            tmp = x * r1c + y * r1s;
            y = x * r1s - y * r1c;
            x = tmp;

            // X軸回転
            tmp = y * r2c + z * r2s;
            z = y * r2s - z * r2c;
            y = tmp;

            // 透視投影
            z -= 0.75;
            if (z >= 0) { continue; }
            scale = 0.15 / z;
            x *= scale;
            y *= scale;

            // 星を描画
            ctx.save();
            ctx.fillStyle = 'hsl(' + i + ',75%,50%)';
            ctx.translate(x, y);
            ctx.scale(scale * 0.02, scale * 0.02);
            ctx.rotate(w * PI2);
            ctx.beginPath();
            ctx.moveTo(2, 0);
            for (j = 0; j < 10; j += 1) {
                ctx.rotate(PI2 * 0.1);
                ctx.lineTo(j % 2 + 1, 0);
            }
            ctx.fill();
            ctx.restore();
        }
    }, 16);
}());