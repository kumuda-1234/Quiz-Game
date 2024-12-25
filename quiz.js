const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const backgroundMusic = document.getElementById('background-music');
const bubbleSound = document.getElementById('bubble-sound');

const questions = [
    { question: "What is 2 + 2?", answers: [{ text: "4", correct: true }, { text: "3", correct: false }, { text: "5", correct: false }, { text: "6", correct: false }] },
    { question: "What is the capital of France?", answers: [{ text: "Berlin", correct: false }, { text: "Paris", correct: true }, { text: "Madrid", correct: false }, { text: "Rome", correct: false }] },
    { question: "What is the largest ocean?", answers: [{ text: "Atlantic", correct: false }, { text: "Pacific", correct: true }, { text: "Indian", correct: false }, { text: "Arctic", correct: false }] },
    { question: "What is 5 * 6?", answers: [{ text: "30", correct: true }, { text: "25", correct: false }, { text: "35", correct: false }, { text: "40", correct: false }] },
    { question: "What planet is known as the Red Planet?", answers: [{ text: "Earth", correct: false }, { text: "Mars", correct: true }, { text: "Jupiter", correct: false }, { text: "Venus", correct: false }] },
    { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Gold", correct: false }, { text: "Diamond", correct: true }, { text: "Iron", correct: false }, { text: "Quartz", correct: false }] },
    { question: "What is the smallest prime number?", answers: [{ text: "1", correct: false }, { text: "2", correct: true }, { text: "3", correct: false }, { text: "4", correct: false }] },
    { question: "What is the chemical symbol for water?", answers: [{ text: "H2O", correct: true }, { text: "O2", correct: false }, { text: "CO2", correct: false }, { text: "H2", correct: false }] },
    { question: "How many continents are there?", answers: [{ text: "5", correct: false }, { text: "7", correct: true }, { text: "6", correct: false }, { text: "8", correct: false }] },
    { question: "What is the currency of Japan?", answers: [{ text: "Yen", correct: true }, { text: "Won", correct: false }, { text: "Dollar", correct: false }, { text: "Euro", correct: false }] }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    backgroundMusic.play(); // Start background music
    document.body.style.backgroundColor = "cyan"; // Set background color to cyan
    startBtn.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.classList.add('hidden');
    createBubbles(50); // Generate more bubbles when quiz starts
    createSnowflakes(50); // Generate snowflakes when quiz starts
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, question.answers));
        answerButtons.appendChild(button);
    });
    startTimer(); // Start the timer for each question
}

function selectAnswer(selectedAnswer, allAnswers) {
    clearTimeout(timer); // Clear the timer when an answer is selected
    const buttons = answerButtons.children;
    for (let button of buttons) {
        button.disabled = true;
        if (button.innerText === selectedAnswer.text) {
            button.classList.add(selectedAnswer.correct ? 'correct' : 'wrong');
            if (selectedAnswer.correct) score++;
        } else if (allAnswers.find(answer => answer.correct && answer.text === button.innerText)) {
            button.classList.add('correct'); // Highlight correct answer
        }
    }
    nextBtn.classList.remove('hidden');
    bubbleSound.play(); // Play bubble sound on answer selection
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextBtn.classList.add('hidden');
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    let message = `<h2>Your score: ${score} out of ${questions.length}</h2>`;
    
    if (score === 10) {
        message += `<div class="congratulations">Congratulations! 🎉✨🎊</div><div class="ribbons"></div>`;
    } else if (score > 5) {
        message += `<h2>Well tried! Keep it up! 💪🌟</h2>`;
    } else {
        message += `<h2>Don't give up! Try again! 💖</h2>`;
    }
    
    resultContainer.innerHTML = message;
}

// Timer function
function startTimer() {
    let timeLeft = 30; // 30 seconds
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time is up!"); // Alert when time is up
            nextBtn.click(); // Automatically go to the next question
        } else {
            timeLeft--;
        }
    }, 1000);
}

// Bubble effect
function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 60 + 20; // Random size between 20 and 80
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration between 5 and 10 seconds
        document.body.appendChild(bubble);
    }
    bubbleSound.play(); // Play bubble sound when bubbles are generated
}

// Snowflake effect
function createSnowflakes(count) {
    for (let i = 0; i < count; i++) {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄'; // Snowflake character
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}em`; // Random size
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration

        document.body.appendChild(snowflake);

        // Remove snowflake after animation ends
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }
}
