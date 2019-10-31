const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "5. Where would you most like to work    ?",
    "choice1": "Rome",
    "choice2": "Nairaobi",
    "choice3": "London",
    "choice4": "Lagos",
    "answer": 1
  },
  {
    "question": "4. Which of these is most important to you in a job?    ",
    "choice1": "Travel",
    "choice2": "Family",
    "choice3": "Technology",
    "choice4": "Opportunities",
    "answer": 3
  },
  {
    "question": " 3. If you could solve one of these problems, which would it be?    ",
    "choice1": "Management",
    "choice2": "HR",
    "choice3": "Facilities",
    "choice4": "Recruitment",
    "answer": 4
  },
  {
    "question": " 2. Which of these skills is your strongest?    ",
    "choice1": "Management",
    "choice2": "Problem Solbing",
    "choice3": "Facilities",
    "choice4": "Data",
    "answer": 3
  },
  {
    "question": " 1. Which type of work do you enjoy the most?   ",
    "choice1": "Helping",
    "choice2": "Seating",
    "choice3": "Facilities",
    "choice4": "Sleeping",
    "answer": 2
  }
]

//CONSTANTS
const CORRECT_BONUS = 0;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  questionCounter++;

  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("../trainings.html");
  }
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS-1}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  // const questionIndex = questionCounter++;
  console.log(questionCounter,availableQuesions,availableQuesions.length);
  // currentQuestion = availableQuesions[questionCounter];
  currentQuestion = availableQuesions.pop();
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // availableQuesions.splice(questionCounter, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "correct";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
