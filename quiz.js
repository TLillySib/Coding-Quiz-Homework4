//var to track the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//var to reference DOM elements
var questionsEl = document.getElementById("questionDiv");
var timerEl = document.getElementById("currentTime");
var choicesEl = document.getElementById("choicesUl");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startTime");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

//sound effects
var sfxRight = new Audio("/Users/tomeekalilly-sibley21/Desktop/Tomeeka Laptop/JHUBootcamp/homework/Coding-Quiz-Homework4/sound effects/correct.wav");
var sfxWrong = new Audio("/Users/tomeekalilly-sibley21/Desktop/Tomeeka Laptop/JHUBootcamp/homework/Coding-Quiz-Homework4/sound effects/incorrect.wav");

function startQuiz() {
  var startPage = document.getElementById("startPage");
  startPage.setAttribute("class", "hide");

  //make questions visible
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  //show starting time
  timerEl.textContent = time;

  getQuestions();
}

function getQuestions() {
  //get current question objects from the array
  var currentQuestion = questions[currentQuestionIndex];
  //update the title of the current question
  var titleEl = document.getElementById("questionTitle");
  titleEl.textContent = currentQuestion.title;
  //clear out any old question choices
  choicesEl.innerHTML = "";

  //loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    //creat new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + "." + choice;
    //attach click event listner to each choice
    choiceNode.onclick = questionClick;

    //display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  //check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    //penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    //display new time on page
    timerEl.textContent = time;

    //play sound effect -"wrong" answer
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    //play sound effect -"right" answer
    sfxRight.play();

    feedbackEl.textContent = "Correct!";
  }
  //flash right/wrong feedback on page
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedbackHide");
  }, 1000);

  //move to next question
  currentQuestionIndex++;

  //check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestions();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  //show end screen
  var endPageEl = document.getElementById("endPage");
  endPageEl.removeAttribute("class");

  //show final score
  var finalScoreEl = document.getElementById("finalScore");
  finalScoreEl.textContent = time;

  //hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  //update time
  time--;
  timerEl.textContent = time;

  //check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighScore() {
  //get value of input box
  var initials = initialsEl.value.trim();

  //make sure value isn't empty
  if (initials !== "") {
    //get saved scores from localstorage, if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    //format the new score object for the new user
    var newScore = {
      score: time,
      initials: initials,
    };
    //save to localStorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    //redirect to next page
    window.location.href = "highscores.html";
  }
}
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighScore();
  }
}
//user clicks button to submit initials
submitBtn.onclick = saveHighScore;

//user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

