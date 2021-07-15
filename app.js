const quizData = [
    {
        "id": 1,
        "question": "クラトスはどのゲームの主人公ですか？",
        "a": "God of War",
        "b": "Prince of Persia",
        "c": "Assassin's Creed",
        "correct": "a"
    },
    {
        "id": 2,
        "question": "最初のゲームコンソールは何でしたか？",
        "a": "Sega Genesis",
        "b": "NES",
        "c": "Magnavox Odyssey",
        "correct": "c"
    },
    {
        "id": 3,
        "question": "史上最も有名なビデオゲームのキャラクターは誰ですか？",
        "a": "Mario",
        "b": "Link",
        "c": "Donkey Kong",
        "correct": "a"
    },
    {
        "id": 4,
        "question": "NESは次の略語でした：",
        "a": "Never Ending Simulation",
        "b": "Nintendo Entertainment System",
        "c": "New Enterprise System",
        "correct": "b"
    },
    {
        "id": 5,
        "question": "これらのうち、Rockstarが開発したゲームではないものはどれですか？",
        "a": "Red Dead Redemption",
        "b": "Bully",
        "c": "Hitman",
        "correct": "c"
    },
    {
        "id": 6,
        "question": "史上最も売れたビデオゲームは何ですか？",
        "a": "Grand Theft Auto 5",
        "b": "Minecraft",
        "c": "Super Mario Bros.",
        "correct": "b"
    },
    {
        "id": 7,
        "question": "プレイステーション4のコンソールはいくつ販売されていますか？",
        "a": "1億1500万",
        "b": "8500万",
        "c": "5500万",
        "correct": "a"
    },
    {
        "id": 8,
        "question": "Nintendoは何年に設立されましたか？",
        "a": "1933",
        "b": "1977",
        "c": "1889",
        "correct": "c"
    },
    {
        "id": 9,
        "question": "これまでに作られた最も高価なビデオゲームは何ですか？",
        "a": "Red Dead Redemption 2",
        "b": "Call of Duty Modern Warfare 2",
        "c": "Cyberpunk 2077",
        "correct": "a"
    },
    {
        "id": 10,
        "question": "最初のバーチャルリアリティヘッドセットが作成されたのは何年ですか？",
        "a": "1992",
        "b": "1995",
        "c": "1998",
        "correct": "b"
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const submitBtn = document.getElementById("submit");
const questionCounterText = document.getElementById("counter");

let currentQuiz = 0;
let score = 0;
const maxQuestions = 5;

// Loading JSON file(but somehow it's not working)
var allQuestions = new Array();

function loadQuestions() {
    $.getJSON('questions.json', function (data) {
        allQuestions = data;
    }).error(function () {
        console.log('error: json not loaded');
    });
};

// Shuffling an array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let shuffled = shuffle(quizData);
console.log(shuffled);
loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = shuffled[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++

        questionCounterText.innerText = `問題 ${currentQuiz + 1}/${maxQuestions}`;

        if (currentQuiz < 5) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>${score}/5問題で正解しました</h2>
            <button onclick="location.reload()">Reload</button>`
        }
    }
});

