'use strict';

//要素の指定
const start = document.getElementById('start');
const home = document.getElementById('home');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const word = document.getElementById('word');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const choiceD = document.getElementById('D');
const counter = document.getElementById('counter');
const timebar = document.getElementById('timebar');
const progressBar = document.getElementById('progressBar');
const scoreDisplay = document.getElementById('scoreContainer');

//問題の作成
let questions = [
    {
        question: '正しい略称を選べ',
        word: '経済連携協定',
        choiceA: 'FTP',
        choiceB: 'DPI',
        choiceC: 'EPA',
        choiceD: 'FTA',
        correct: 'C'
    }, {
        question: '正式名称を選べ',
        word: 'APEC',
        choiceA: 'アジア太平洋経済協力',
        choiceB: '東南アジア諸国連合',
        choiceC: 'ASEAN自由貿易地域',
        choiceD: 'アジア協力対話',
        correct: 'A'
    }, {
        question: '正式名称の選べ(英語)',
        word: 'CIA',
        choiceA: 'Common Information Association',
        choiceB: 'Central Intelligence Agency',
        choiceC: 'Centre for International Agency',
        choiceD: 'Central Information Agency',
        correct: 'B'
    }, {
        question: '正式名称を選べ',
        word: 'ECB',
        choiceA: '欧州経済領域',
        choiceB: '欧州自由貿易連合',
        choiceC: '欧州共同体',
        choiceD: '欧州中央銀行',
        correct: 'D'
    }, {
        question: '正しい略称を選べ',
        word: '国際民間航空機関',
        choiceA: 'IAEA',
        choiceB: 'ICAO',
        choiceC: 'IODP',
        choiceD: 'ITER',
        correct: 'B'
    }, {
        question: '正式名称を選べ',
        word: 'IMF',
        choiceA: '国際労働機関',
        choiceB: '国際エネルギー機関',
        choiceC: '国際通貨基金',
        choiceD: '非政府組織',
        correct: 'C'
    }, {
        question: '正式名称を選べ',
        word: 'NAFTA',
        choiceA: '北米自由貿易協定',
        choiceB: '北大西洋条約機構',
        choiceC: '国際治安支援部隊',
        choiceD: '国際協力銀行',
        correct: 'A'
    }, {
        question: '正しい略語を選べ',
        word: '政府開発援助',
        choiceA: 'OAS',
        choiceB: 'PKO',
        choiceC: 'WIPO',
        choiceD: 'ODA',
        correct: 'D'
    }, {
        question: '正しい略語を選べ',
        word: '石油輸出国機構',
        choiceA: 'OPEC',
        choiceB: 'OSCE',
        choiceC: 'OECD',
        choiceD: 'IEA',
        correct: 'A'
    }, {
        question: '正しい略語を選べ',
        word: '国連教育科学文化機関',
        choiceA: 'UNHCHR',
        choiceB: 'UNICEF',
        choiceC: 'UNESCO',
        choiceD: 'UNTAET',
        correct: 'C'
    }, {
        question: '正式名称を選べ',
        word: 'WFP',
        choiceA: '世界保健機関',
        choiceB: '世界食糧計画',
        choiceC: '世界貿易機関',
        choiceD: '国連開発計画',
        correct: 'B'
    }, {
        question: '正式名称を選べ',
        word: '日本貿易振興会',
        choiceA: 'JICA',
        choiceB: 'JPEG',
        choiceC: 'JETRO',
        choiceD: 'JASDAQ',
        correct: 'C'
    }, {
        question: '正しい略語意味を選べ',
        word: '東証株価指数',
        choiceA: 'NASDAQ',
        choiceB: 'JASDAQ',
        choiceC: 'MOTHERS',
        choiceD: 'TOPIX',
        correct: 'D'
    }, {
        question: '正式名称を選べ(英語)',
        word: 'JIS',
        choiceA: 'Japan Industry Standards',
        choiceB: 'Junior Intelligence Standards',
        choiceC: 'Japan Information Sector',
        choiceD: 'Japan International Services',
        correct: 'A'
    }, {
        question: '正しい意味を選べ',
        word: '国内総生産',
        choiceA: 'GNI',
        choiceB: 'GNP',
        choiceC: 'GDP',
        choiceD: 'GPS',
        correct: 'C'
    }
];

//変数指定
const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0; //開始時点
const timeLimit = 10; //10秒
const barLength = 500; //500px
const barUnit = barLength / timeLimit; //1秒に50px
let timer;
let score = 0;


//ホームのスタートボタンにクリックイベント
start.addEventListener('click', startQuiz);


//ゲームの開始 ホームのスタートボタンのclickイベントで使用する関数
function startQuiz() {
    home.style.display = 'none'; //スタート画面を非表示
    quiz.style.display = 'block'; //クイズ画面の表示
    drawQuestion();
    drawProgress();
    drawCounter();
    timer = setInterval(drawCounter, 1000);
}



//問題の描画
function drawQuestion() {
    let q = questions[currentQuestion];
    //問題文の描画
    question.innerHTML = '<p><span id="qNumber">Q.' + (currentQuestion + 1) + '</span>' + q.question + '</p>';
    word.innerHTML = '<p id="term">' + q.word + '</p>';
    
    //回答の描画
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    
}

//カウンターの描画
function drawCounter() {
    
    if (count <= timeLimit) {
        counter.innerHTML = count;
        //カウンターの長さ、15pxずつ
        timebar.style.width = count * barUnit + 'px'; 
        count++;
       
        for (let i = 0; i < count; i++) {
            if (count > 9) {
                timebar.style.backgroundColor = 'rgba(247,171,173,0.9)';
            } else if (count > 7) {
                timebar.style.backgroundColor = 'rgba(255,255,146,0.9)';
            } else {
                timebar.style.backgroundColor = 'rgba(126,203,220,0.9)';
            }
        }
        
    } else {
        //未回答のまま10秒になると、カウンター0、次の問題に飛ぶ
        count = 0;
        answerWrong(); //未回答でもバツ
        //drawCorrect();

        if (currentQuestion < lastQuestion) {
            currentQuestion++;
            setTimeout(drawQuestion, 1000);
            
        } else {
            //クイズ終了で結果の表示
            clearInterval(timer);
            drawScore();
        }
    }
}

//進行状況の描画
function drawProgress() {
    for (let i = 0; i <= lastQuestion; i++) {
        progressBar.innerHTML += "<div class='prog' id=" + i + "></div>";
    }
}

//回答の正誤判定の処理
function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correct) {
        score++;
        answerCorrect();
        
        
    } else {
        answerWrong();
        
    }


    count = 0;

    //最後の問題になるまでインターバル
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        setTimeout(drawQuestion, 1000);
        
    } else {
        //クイズ終了で結果の表示
        clearInterval(timer);
        drawScore();
    }
}

//正解のとき✓
function answerCorrect() {
    document.getElementById(currentQuestion).innerHTML += '<img src="images/correct.png">';
}
//不正解はバツ
function answerWrong() {
    document.getElementById(currentQuestion).innerHTML += '<img src="images/wrong.png">';
}

function drawCorrect() {
    document.getElementById(questions[currentQuestion].correct).classList.add('correctChoice');
}

//スコア画面の描画
function drawScore() {
    scoreDisplay.style.display = 'block';

    //正答率を%で計算して表示
    const scorePercentage = Math.round(100 * score / questions.length);

    scoreDisplay.innerHTML += '<p>' + scorePercentage + '点</p>';
}

//ホームの日付部分
const now = new Date();
const month = now.getMonth();
const date = now.getDate();
const week = now.getDay();
const weeks = ['日', '月', '火', '水', '木', '金', '土'];
const w = weeks[week];

document.getElementById('month').innerHTML = month+1;
document.getElementById('date').innerHTML = date;
document.getElementById('week').innerHTML = w;

