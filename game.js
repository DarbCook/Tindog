// Declared Variables

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

// Game Sequence Generator

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut()
    .fadeIn();

  playSound(randomChosenColor);

  level++;

  $("h1").html("Level "+level);

  userClickedPattern = [];
}

// User Click Function

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(this);

  checkAnswer(userClickedPattern[userClickedPattern.length - 1]);

  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
});

// Play Sound Function

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

// Animate User Clicks Function

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

// Starts Game Keydown Method

$(document).one("keydown", function () {
  nextSequence();
});

// Sequence Verification/Game-Over&Reset

function checkAnswer(currentLevel) {
  if (gamePattern[userClickedPattern.length - 1] === currentLevel) {
    console.log("success");
  } else if (gamePattern[userClickedPattern.length - 1] !== currentLevel) {
    console.log("wrong!");
    wrongBGColor();
    playWrong();
   
    level = 0;
    gamePattern = [];
    $(document).one("keydown", function () {
      nextSequence();
    });
  }
}

// Wrong Effect

function wrongBGColor() {
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").html("Game Over, Press Any Key to Restart");
}

function playWrong() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}
