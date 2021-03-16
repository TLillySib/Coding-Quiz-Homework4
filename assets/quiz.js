//Var with an array and object for the questions and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];
//Declare variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionDiv = document.querySelector("questionDiv");
var container = document.querySelector("#container");

//variables for time-15 seconds per questions total of 75 seconds for quiz
var secondsLeft = 75;
//Keep the interval time
var holdInterval = 0;
//Keep the penalty time
var penalty = 10;
//Creates a new element
var ulCreate = document.createElement("ul");

//Event triggers timer on button click and shows user a display on page
timer.addEventListener("click", function () {
    if(holdInterval === 0) {
    holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            //Stops execution of action at set interval
            clearInterval(holdInterval);
            allDone();
            currentTime.textContent = "Time's up!";
        }
    }, 1000);
    }
    displayQuestions(questionIndex);
});
 
//Render questions and answers to page
function displayQuestions(questionIndex) {
    //Clears existing information
    questionDiv.innerHTML = "";
    ulCreate.innerHTML = "";
//For loops to go through the information in the array
    for (var i = 0; i < questions.length; i++) {
        //Adds question title only
        var userQuestion = questions [questionIndex].title;
        var userChoices = questions [questionIndex].choices;
        questionDiv.textContent = userQuestion;
    }

    //New item for each question choices
    userChoices.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
}
//Event to compare choices with the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "creatDiv");
        //The correct condition
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        //The correct condition
        } else {
        // Will deduct -5 seconds off secondsLeft for wrong answer
        secondsLeft = secondsLeft - penalty;
        createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;     
        }
    }
    // The Question index determines the question number for user
    questionIndex++;

    if (questionIndex >= questions.length) {
        //The All done will append the last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionDiv.appendChild(createDiv);

}
//The All done will append the last page
function allDone() {
    questionDiv.innerHTML = "";
    currentTime.innerHTML = "";
}

//Create the headings:
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.setAttribute("value", "createH1")

createH1.textContent = "All Done!";

questionDiv.appendChild(createH1);

//The paragraph:

var createP = document.createElement("p");
createP.setAttribute("id", "createP");

questionDiv.appendChild(createP);

//Calculate the time remaining and calculate the score
if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionDiv.appendChild(createP2);
}

//Create a label
var createLabel = document.createElement('label');
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Enter your initials:  ";

questionDiv.appendChild(createLabel);

//The label input

var createInput =document.createElement("input");
createInput.setAttribute("type", " text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";

questionDiv.appendChild(createInput);

//The submit information

var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "Submit");
createSubmit.textContent = "Submit";

questionDiv.appendChild(createSubmit);

//Create an Event listner to capture initials and local storage for initials and score
createSubmit.addEventListener("click", function() {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining,
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
    }
});






  