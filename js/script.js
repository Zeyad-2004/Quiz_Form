alert("Are You Ready for QUIZ ?!");

const questions = [
    "What is the capital of France?",
    "What is the largest ocean in the world?",
    "What is the square root of 16?",
    "What is the name of the tallest mountain in the world?",
    "What is the chemical formula for water?"
];

const answers = [
    ["Paris", "London", "Berlin", "Rome"],
    ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    ["4", "2", "1", "8"],
    ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    ["H2O", "O2", "CO2", "CH4"]
];

let questionsNumber = [];
let questionsDone=0, score=0, nowQuestion, trueAnswer;

let question = document.getElementById('question');

let check = document.querySelector('#answer');
let ans1 = document.getElementsByClassName('1')[0];
let ans2 = document.getElementsByClassName('2')[0];
let ans3 = document.getElementsByClassName('3')[0];
let ans4 = document.getElementsByClassName('4')[0];
let next = document.getElementsByClassName('next')[0];

function generatQuestion(){
    // Generate Question
    questionsDone++;

    let randomQuestion, QIndex;
    do{
        randomQuestion = Math.floor(Math.random() * questions.length)+1;
        QIndex = questionsNumber.indexOf(randomQuestion);
    }
    while(QIndex === -1);
    
    delete questionsNumber[QIndex];
    question.innerHTML = `<h3>${questions[QIndex]}</h3>`;

    nowQuestion = QIndex;

    // Generate Answer of Question
    let answerTemp = [1,2,3,4];
    for (let i = 0; i < 4; i++) {
        let randomAnswer, AIndex;
        do{
            randomAnswer = Math.floor(Math.random() * 4)+1;
            AIndex = answerTemp.indexOf(randomAnswer);
        }
        while(AIndex == -1);

        delete answerTemp[AIndex];
        if(randomAnswer === 1) trueAnswer = i+1;
        eval("ans"+(i+1)).innerHTML = answers[QIndex][AIndex];
    }
}



check.addEventListener("click", function(e){
    if(e.target.tagName === 'BUTTON'){
        next.style.display = "block";
        for (let i = 0; i < 4; i++) {
            eval("ans"+(i+1)).disabled = true;
            eval("ans"+(i+1)).classList.add("hover-disabled");
        }
        if(e.target.classList.contains(trueAnswer)){
            e.target.style.backgroundColor = "#9ddfbb";
            score++;
        }
        else {
            e.target.style.backgroundColor = "#fe998d";
            eval("ans"+(trueAnswer)).style.backgroundColor = "#9ddfbb";
        }
    }
})



next.addEventListener('click',function(e){
    if(questionsDone < questions.length){
        for (let i = 0; i < 4; i++) {
            eval("ans"+(i+1)).disabled = false;
            eval("ans"+(i+1)).classList.remove("hover-disabled");
            eval("ans"+(i+1)).style.backgroundColor = "";

        }
        generatQuestion();
    }else{
        document.getElementById('content').innerHTML=
        `<div id='question'>
            <h3>You scored ${score} out of ${questions.length}!</h3>
        </div>
        <button class="next" onclick="window.location.reload();">Play Again</button>
        `;
    }

    e.target.style.display = "none";
});



window.addEventListener("load", function(){
    questionsDone=0;
    score=0;
    
    for (let i = 1; i <= questions.length; i++) {
        questionsNumber.push(i);
    }
    generatQuestion();

});



