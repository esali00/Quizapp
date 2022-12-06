let currentQuestion = 0;
let correct_answers = 0;
let quiz_type = "";
let topics = ["HTML", "CSS", "JS", "JAVA"];

let success = new Audio("audio/correct_tone.mp3");
let fail = new Audio("audio/false_tone.mp3");


function setType(type) {
    quiz_type = type;
}


function initAll(topicId, type) {

    addWhiteColor(topicId);

    setType(type);

    let start_btn = document.getElementById("start-btn");

    document.getElementById("start-btn").setAttribute(`onclick`, `render()`)


}

function addFuncToStartBtn(topic) {
    document.getElementById("start-btn").innerHTML =
        `<span><a onclick="revealHint(),removeInits('${topic}')" href="#" class="btn btn-warning fs-4 text-white text-decoration-none">STARTE JETZT</a></span>`
}


function removeInits(topic) {
    for (let i = 0; i < topics.length; i++) {
        document.getElementById(`${topics[i]}`).removeAttribute("onclick");
    }
    document.getElementById(`${topic.toUpperCase()}`).setAttribute(`onclick`, `initAll('${topic.toUpperCase()}','${topic}'),render()`)

}


function addWhiteColor(topicId) {

    for (let i = 0; i < topics.length; i++) {
        document.getElementById(`${topics[i]}`).classList.remove("white");
    }

    document.getElementById(`${topicId}`).classList.add("white");

}


function revealHint() {
    document.getElementById("hint-text").classList.remove("d-none")
}


function render() {
    document.getElementById("quiz-field").style.backgroundImage = "none";

    document.getElementById("quiz-field").style.backgroundColor = "rgba(0, 0, 0, 0.05)"

    document.getElementById('quiz-field').innerHTML =
        `
        <div class="quiz-card card">
    
            <div class="card-body" id="endScreen" style="display: none;">
                <div class="mb-4 d-flex justify-content-center align-items-center flex-column">
                    <img class="card-img-top" id="endScreenLogo" src="img/brain result.png"/>
    
                    <span><h2>Fertig!</h2></span>
                    
                </div>
                <div class="mb-4 d-flex justify-content-around align-items-center">
                    <span><h3 style="margin-bottom: 0">Dein Ergebnis</h3></span> <span class="fs-3 text-warning"><span id="correct-answer"></span>/<span id="all-question"></span></span>
                </div>
                <div class="mb-4 d-flex justify-content-center align-items-center flex-column">
                    <a href="#" class="mb-3 btn btn-primary btn-lg active" role="button" aria-pressed="true">Teile</a>
                    <a onclick="restartQuiz()" href="#" class="btn btn-link text-decoration-none">Spiele nochmal</a>
                </div>
            </div>
    
            <div class="card-body" id="question-body">
    
                <img id="quiz-img" src="img/quiz.jpg" class="card-img-top">
    
                <div class="progress">
                    <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 0;"></div>
                </div>
    
                <h5 class="mt-2 card-title" id="question_text">Frage</h5>
    
                <div class="card quiz-answer-card m-2">
                    <div class="card-body" id="answer_1" onclick="answer('answer_1')">
                        <span class="answer-character">A</span>
                    </div>
                </div>
    
                <div class="card quiz-answer-card m-2">
                    <div class="card-body" id="answer_2" onclick="answer('answer_2')">
                        <span class="answer-character">B</span>
                    </div>
                </div>
    
                <div class="card quiz-answer-card m-2">
                    <div class="card-body" id="answer_3" onclick="answer('answer_3')">
                        <span class="answer-character">C</span>
                    </div>
                </div>
    
                <div class="card quiz-answer-card m-2">
                    <div class="card-body" id="answer_4" onclick="answer('answer_4')">
                        <span class="answer-character">D</span>
                    </div>
                </div>
    
                <div class="question-footer m-2">
                    <span><b id="question-number">1</b> von <b id="questions_amount"></b> Fragen</span> <span><button onclick="nextQuestion()" id="next-button" disabled class="btn btn-primary">Nächste Frage</button></span>
                </div>

                <div class="cursor-pointer d-flex justify-content-between align-items-center" >
                    <span><a style="display: none;" id="start-btn" href="#" class="btn btn-warning text-white text-decoration-none">Change Quiz</a></span>
                </div>
            </div>
        </div> 
    `
    init();

}

function init() {
    showQuestion();
}

function showQuestion() {
    let question = questions[quiz_type][currentQuestion];

    if (currentQuestion >= questions[quiz_type].length) {

        document.getElementById("endScreenLogo").src = "img/brain result.png"
        document.getElementById("endScreen").style = "";
        document.getElementById("question-body").style = "display: none";
        document.getElementById("correct-answer").innerHTML = correct_answers;
        document.getElementById("all-question").innerHTML = questions[quiz_type].length

        for (let i = 0; i < topics.length; i++) {
            document.getElementById(`${topics[i]}`).setAttribute(`onclick`, `initAll('${topics[i]}','${topics[i].toLowerCase()}'),render(),removeInits('${topics[i].toLowerCase()}')`)
        }

    } else {

        let percent = ((currentQuestion + 1) / questions[quiz_type].length);
        percent = Math.round(percent * 100);


        document.getElementById("progress-bar").innerHTML = `${percent} %`;
        document.getElementById("progress-bar").style.width = `${percent}%`;


        document.getElementById("questions_amount").innerHTML = questions[quiz_type].length;

        document.getElementById("question-number").innerHTML = currentQuestion + 1;

        document.getElementById("question_text").innerHTML = question["question"];

        document.getElementById("answer_1").innerHTML = `
            <span class="answer-character">A</span>
            <span class="left-padding">${question["answer_1"]}</span>`

        document.getElementById("answer_2").innerHTML = `
            <span class="answer-character">B</span>
            <span class="left-padding">${question["answer_2"]}</span>`

        document.getElementById("answer_3").innerHTML = `
            <span class="answer-character">C</span>
            <span class="left-padding">${question["answer_3"]}</span>`

        document.getElementById("answer_4").innerHTML = `
            <span class="answer-character">D</span>
            <span class="left-padding">${question["answer_4"]}</span>`
    }
}

function answer(selection) {
    let question = questions[quiz_type][currentQuestion];

    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question["right_answer"]}`;

    if (selectedQuestionNumber == question["right_answer"]) {
        console.log("Richtige Antwort")
        success.play();
        document.getElementById(selection).parentNode.classList.add('bg-success');
        correct_answers++;
    } else {
        console.log("Falsche Antwort");
        fail.play();
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    }

    document.querySelectorAll(".card-body").forEach(answer => {
        answer.removeAttribute("onclick");
    })

    document.getElementById("next-button").disabled = false;
}




function nextQuestion() {
    currentQuestion++;

    showQuestion();

    document.getElementById("next-button").disabled = true;


    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).setAttribute("onclick", `answer('answer_${i}')`)
    }

    resetAnswerButton();

}

function resetAnswerButton() {

    document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_1").parentNode.classList.remove("bg-success");

    document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_2").parentNode.classList.remove("bg-success");

    document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_3").parentNode.classList.remove("bg-success");

    document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_4").parentNode.classList.remove("bg-success");

}

function restartQuiz() {
    document.getElementById("endScreenLogo").src = "img/quiz.jpg"
    currentQuestion = 0;
    correct_answers = 0;
    init();

    document.getElementById("endScreen").style = "display: none";

    document.getElementById("question-body").style = "";

}