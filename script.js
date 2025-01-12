const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin","Paris", "Madrid", "Rome"],
        correct: "Paris",
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python",  "C++", "JavaScript","Ruby"],
        correct: "JavaScript",
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "H2"],
        correct: "H2O",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        correct: "Mars",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Hemingway", "Dickens", "Tolstoy"],
        correct: "Shakespeare",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question");
const options = document.querySelectorAll(".option-btn");
const nextButton = document.getElementById("next-btn");

const totalQuestions = document.getElementById("total-questions");
const attemptedQuestions = document.getElementById("attempted-questions");
const correctAnswers = document.getElementById("correct-answers");
const wrongAnswers = document.getElementById("wrong-answers");
const percentage = document.getElementById("percentage");
const finalScore = document.getElementById("final-score");

document.getElementById("start-quiz-btn").addEventListener("click", () => {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;

    options.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });

    nextButton.style.display = "none";
}

function checkAnswer(selectedButton) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    attempts++;

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    options.forEach((button) => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
    document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    totalQuestions.textContent = questions.length;
    attemptedQuestions.textContent = attempts;
    correctAnswers.textContent = score;
    wrongAnswers.textContent = attempts - score;
    percentage.textContent = `${((score / questions.length) * 100).toFixed(2)}%`;
    finalScore.textContent = `${score} / ${questions.length}`;
}

document.getElementById("try-again-btn").addEventListener("click", () => {
    resetQuiz();
    quizContainer.style.display = "block";
});

document.getElementById("go-home-btn").addEventListener("click", () => {
    resetQuiz();
    startContainer.style.display = "block";
});

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    attempts = 0;
    resultContainer.style.display = "none";
    loadQuestion();
}
