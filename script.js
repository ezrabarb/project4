// Define your questions and corresponding result options
const questions = [
    {
        question: "What's your favorite color?",
        answers: [
            { option: "Blue", score: 1 },
            { option: "Red", score: 2 },
            { option: "Green", score: 3 },
            { option: "Yellow", score: 4 }
        ]
    },
    {
        question: "What's your preferred leisure activity?",
        answers: [
            { option: "Reading", score: 1 },
            { option: "Sports", score: 2 },
            { option: "Watching movies/TV shows", score: 3 },
            { option: "Traveling", score: 4 }
        ]
    },
    {
        question: "How do you handle stress?",
        answers: [
            { option: "Take deep breaths and relax", score: 1 },
            { option: "Exercise or engage in physical activity", score: 2 },
            { option: "Talk to friends or family", score: 3 },
            { option: "Plan a getaway or take a vacation", score: 4 }
        ]
    }
    // Add more questions here if needed
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
    if (totalScore <= 4) {
        result = "You're calm and collected.";
    } else if (totalScore <= 8) {
        result = "You're passionate and energetic.";
    } else if (totalScore <= 12) {
        result = "You're peaceful and harmonious.";
    } else {
        result = "You're cheerful and optimistic.";
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
