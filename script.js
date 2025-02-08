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
    question: "Which Indian Celebrity was born on 8th Feb?",
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

const questionElement = document.getElementById('question');
const answerButtonContainer = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');
const enterButton = document.getElementById('enter-btn');

let currentQuestionIndex = 0;
let score = 0;
let selectedButton = null;
let selectedAnswer = null;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  selectedButton = null;
  selectedAnswer = null;
  answerButtonContainer.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');

    button.addEventListener('click', () => {
      if (selectedButton) {
        selectedButton.classList.remove('selected');
      }
      selectedButton = button;
      selectedAnswer = answer;
      button.classList.add('selected');
    });
    answerButtonContainer.appendChild(button);
  });
}

enterButton.addEventListener('click', () => {
  if (selectedButton && selectedAnswer) {
    Array.from(answerButtonContainer.children).forEach(btn => {
      btn.disabled = true;
    });

    selectedButton.classList.remove('selected');

    if (selectedAnswer.correct) {
      selectedButton.classList.add('correct');
      score++;
    } else {
      selectedButton.classList.add('incorrect');
    }

    nextButton.style.display = "block";
  } else {
    alert("Please select an answer first!");
  }
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    nextButton.style.display = "none";
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  nextButton.style.display = "none";
  questionElement.innerHTML = "Quiz Completed!";
  answerButtonContainer.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;

  const restartButton = document.createElement('button');
  restartButton.innerText = "Restart Quiz";
  restartButton.classList.add('btn');
  restartButton.addEventListener('click', startQuiz);
  answerButtonContainer.appendChild(restartButton);
}

startQuiz();
