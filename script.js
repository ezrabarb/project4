// Define your questions and corresponding result options
const questions = [
    {
        question: "What are your fitness goals?",
        answers: [
            { option: "Weight loss", score: 1 },
            { option: "Muscle gain", score: 2 },
            { option: "Improved endurance", score: 3 },
            { option: "Flexibility", score: 4 },
            { option: "Overall health", score: 5 }
        ]
    },
    {
        question: "How much time can you realistically dedicate to exercise each week?",
        answers: [
            { option: "Less than 1 hour", score: 1 },
            { option: "1-3 hours", score: 2 },
            { option: "3-5 hours", score: 3 },
            { option: "More than 5 hours", score: 4 }
        ]
    },
    {
        question: "What's your activity level?",
        answers: [
            { option: "Sedentary (little to no exercise)", score: 1 },
            { option: "Lightly active (light exercise/sports 1-3 days a week)", score: 2 },
            { option: "Moderately active (moderate exercise/sports 3-5 days a week)", score: 3 },
            { option: "Very active (hard exercise/sports 6-7 days a week)", score: 4 },
            { option: "Extra active (very hard exercise/sports & physical job or 2x training)", score: 5 }
        ]
    },
    {
        question: "Are you familiar with gym equipment?",
        answers: [
            { option: "Yes", score: 1 },
            { option: "No", score: 2 }
        ]
    }
];

let currentQuestion = 0;
let totalScore = 0;

const questionContainer = document.getElementById('question-container');
const backButton = document.getElementById('back-btn');
const redoButton = document.getElementById('redo-btn');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');

// Function to display the current question
function displayQuestion() {
    const current = questions[currentQuestion];
    questionContainer.innerHTML = `
        <div id="question">${current.question}</div>
        <div id="answer-container">
            ${current.answers.map(answer => `
                <input type="radio" name="question${currentQuestion}" value="${answer.score}" id="q${currentQuestion + 1}a${answer.score}">
                <label for="q${currentQuestion + 1}a${answer.score}">${answer.option}</label><br>
            `).join('')}
        </div>
    `;
}

// Function to calculate the result based on the total score
function calculateResult() {
    // Define your result interpretation based on the total score
    let result = '';
    if (totalScore <= 5) {
        result = "Your fitness level is beginner. Consider starting with light exercises and gradually increase intensity.";
    } else if (totalScore <= 10) {
        result = "Your fitness level is intermediate. You're ready for moderate workouts to challenge yourself.";
    } else {
        result = "Your fitness level is advanced. You can handle intense workouts to push your limits.";
    }
    resultContainer.textContent = result;
}

// Event listener for the "Next" button click
nextButton.addEventListener('click', function() {
    // Get the selected answer's score
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (selectedAnswer) {
        totalScore += parseInt(selectedAnswer.value);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
            backButton.style.display = 'inline-block';
        } else {
            calculateResult();
            nextButton.style.display = 'none';
            redoButton.style.display = 'inline-block';
        }
    } else {
        alert('Please select an answer.');
    }
});

// Event listener for the "Back" button click
backButton.addEventListener('click', function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        if (currentQuestion === 0) {
            backButton.style.display = 'none';
        }
    }
});

// Event listener for the "Redo" button click
redoButton.addEventListener('click', function() {
    currentQuestion = 0;
    totalScore = 0;
    displayQuestion();
    resultContainer.textContent = '';
    redoButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
});

// Display the first question when the page loads
displayQuestion();
