// Quiz questions array
const questions = [
  {
    question: "Which planet in our solar system is known as the Red Planet?",
    answer: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Venus', correct: false }
    ]
  },
  {
    question: "Which Indian Celebirty was born 8th Feb",
    answer: [
      { text: 'Piyush', correct: true },
      { text: 'Priyanshu', correct: false },
      { text: 'Ankur', correct: false },
      { text: 'Laksh', correct: false }
    ]
  },
  {
    question: "Which of the following is the largest ocean on Earth?",
    answer: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true }
    ]
  },
  {
    question: "What is the capital city of Japan?",
    answer: [
      { text: 'Kyoto', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Osaka', correct: false },
      { text: 'Hiroshima', correct: false }
    ]
  },
  {
    question: "Who is credited with inventing the practical incandescent light bulb?",
    answer: [
      { text: 'Nikola Tesla', correct: false },
      { text: 'Alexander Graham Bell', correct: false },
      { text: 'Thomas Edison', correct: true },
      { text: 'Isaac Newton', correct: false }
    ]
  }
];

// DOM elements
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

// Start or restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

// Display the current question and its answer options
function showQuestion() {
  // Clear any previous answers
  answerButton.innerHTML = "";
  
  // Get the current question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  
  // Display question number and text
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
  // Create answer buttons for each option
  currentQuestion.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    // Add event listener for answer selection
    button.addEventListener('click', () => selectAnswer(button, answer));
    answerButton.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(button, answer) {
  // Disable all answer buttons after one is selected
  Array.from(answerButton.children).forEach(btn => {
    btn.disabled = true;
    // Mark the selected answer with a correct or incorrect class
    if (btn.innerHTML === button.innerHTML) {
      btn.classList.add(answer.correct ? 'correct' : 'incorrect');
    }
  });
  
  if (answer.correct) {
    score++;
  }
  
  // Show the Next button so the user can move to the next question
  nextButton.style.display = "block";
}

// Next button event listener
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    nextButton.style.display = "none";
    showQuestion();
  } else {
    showScore();
  }
});

// Show final score and a restart button
function showScore() {
  nextButton.style.display = "none";
  questionElement.innerHTML = "Quiz Completed!";
  answerButton.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;
  
  const restartButton = document.createElement('button');
  restartButton.innerHTML = "Restart Quiz";
  restartButton.classList.add('btn');
  restartButton.addEventListener('click', startQuiz);
  answerButton.appendChild(restartButton);
}

// Start the quiz when the page loads
startQuiz();
