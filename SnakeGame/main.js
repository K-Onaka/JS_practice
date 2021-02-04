'use strict';

const can = document.getElementById('canvas');
const con = can.getContext('2d');

//ボックスのサイズ
let box = 32;

//リンゴの画像読み込み
const appleImg = new Image();
appleImg.src = 'images/apple.png';

//ヘビの座標
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 11 * box
};

//リンゴの座標
let apple = {
    //フィールドは17マス*15マス
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 16 + 3) * box
};

//スコア
let score = 0;

//キーで操作する
let d;
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && d != 'right') {
        d = 'left';
    } else if (event.keyCode === 38 && d != 'down') {
        d = 'up';
    } else if (event.keyCode === 39 && d != 'left') {
        d = 'right';
    } else if (event.keyCode === 40 && d != 'up') {
        d = 'down';
    }
}


//================================================ヘビ、ベース、リンゴ、スコアの描画をする
function draw() {
    //キャンバスの背景
    con.fillStyle = '#888';
    con.fillRect(0, 0, can.width, can.height);
    con.fillStyle = '#111';
    con.fillRect(0, 64, can.width, can.height);
    con.fillStyle = 'rgba(100, 100, 100)';
    con.fillRect(32, 96, box * 17, box * 16);
    //ヘビ(ループ)
    for (let i = 0; i < snake.length; i++) {
        con.fillStyle = (i === 0) ? '#7fff00' : '#8a2be2'; //三項演算子
        con.fillRect(snake[i].x, snake[i].y, box, box);
        con.strokeStyle = '#111';
        con.strokeRect(snake[i].x, snake[i].y, box, box);

        //目の描画
        /*if (i === 0){
            con.fillStyle = '#fff';
            con.fillRect(snake[i].x + 2, snake[i].y + 1, 10, 10);
            
            con.fillStyle = '#000';
            con.arc(snake[i].x + 6, snake[i].y + 4, 3, 0, Math.PI*2);
            con.fill();
            
            con.fillStyle = '#fff';
            con.fillRect(snake[i].x + 20, snake[i].y + 1, 10, 10);
            
            con.fillStyle = '#000';
            con.arc(snake[i].x + 26, snake[i].y + 4, 3, 0, Math.PI*2);
            con.fill();;
        }*/
    }
    //リンゴ
    con.drawImage(appleImg, apple.x, apple.y);
    //スコア
    con.drawImage(appleImg, 0.5 * box, 0.5 * box);
    con.fillStyle = 'white';
    con.font = '45px Franklin Gothic';
    con.fillText('× ' + score, 2 * box, 1.6 * box);

    //移動前のヘビの頭の位置
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //移動方向
    if (d === 'left') snakeX -= box;
    if (d === 'up') snakeY -= box;
    if (d === 'right') snakeX += box;
    if (d === 'down') snakeY += box;

    //リンゴを食べて体が増える処理(食べる＝座標が重なる)
    if (snakeX === apple.x && snakeY === apple.y) {
        score++;
        apple = { //食べた分のリンゴは消え、別の座標に再度表示
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 16 + 3) * box
        };
    } else {
        //移動後にしっぽの最後を削除
        snake.pop();
    }

    //移動先に頭を描画
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    
    //自分の体との衝突の処理
    function selfCrush(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    //ゲームオーバー処理
    /**/
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 18 * box || selfCrush(newHead, snake)) {
        clearInterval(game);

        con.fillStyle = 'rgba(90, 90, 90, .5)';
        con.fillRect(32, 96, box * 17, box * 16);

        con.font = ('50px "Franklin Gothic Medium"');
        con.fillStyle = '#fff';
        con.fillText('GAME OVER', 5.5 * box, 10 * box);

        con.fillStyle = '#fff';
        con.font = ('40px "Franklin Gothic Medium"');
        con.fillText('SCORE: ' + score, 7 * box, 12 * box);

    }

    snake.unshift(newHead);

}; //=============================================/function draw()

//ゲームスピード
let game = setInterval(draw, 150);
