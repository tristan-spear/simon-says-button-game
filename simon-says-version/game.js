var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNum;
var randomColor;
var sound;
var userChosenColor;
var level = 0;
var testing = 0;
var previous = 0;

// Next Sequence Function
function nextSequence() {
    randomNum = Math.floor(Math.random()*4);
    
    // reduce number of repeats
    if(randomNum === previous) {
        randomNum = Math.floor(Math.random()*4);
    }

    previous = randomNum;

    gamePattern.push(buttonColors[randomNum]);
    randomColor = buttonColors[randomNum];
    $("h1").text("Level " + ++level);

    userClickedPattern = [];

    playSound(randomColor);
    console.log("testing: " + ++testing);
}

// Button Click
$(".btn").click(function(event) {
    
    userChosenColor = this.id;
    playSound(userChosenColor);

    if(level > 0) {
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
})

// Play Sound
function playSound(color) {
    $("." + color).addClass("pressed");
    // sound = new Audio("./sounds/" + color + ".mp3");
    sound = new Audio("./sounds/ben.mp3");
    sound.play();
    setTimeout(function() {
        $("." + color).removeClass("pressed");
    }, 100);
}

// Button Start
$(document).on("click", ".start", function() {
    startGame();
});

// Start Game
function startGame() {
    $(".container").removeClass("hide");
    $("#title").removeClass("downshift");
    if(level === 0)
        nextSequence();
}

// Check Answer
function checkAnswer(currentLevel) {
    
    if(currentLevel === -1) {
        return;
    }
    
    else if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {   
       
        if(currentLevel + 1 === gamePattern.length) {
            setTimeout(nextSequence, 800);
        }
    }
    
    else {
        sound = new Audio("./sounds/wrong.mp3");
        sound.play();
        startOver();
        $("body").removeClass("background-gradient");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("body").addClass("background-gradient");
            $(".container").addClass("hide");
            $("#level-title").html("<span class='lost'>Game Over!</span><br /><div id='restart-button' class='start'>Press Here to Restart</div>");
            $("#title").addClass("downshift");
            level = 0;
        }, 250);
    }
}

function startOver() {
    userClickedPattern = [];
        gamePattern = [];
        level = 0;
}