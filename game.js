var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

// Random Button Function
function nextSequence() {
  // Empty userClickedPattern
  userClickedPattern = [];

  // Increase level
  level++;
  $("#level-title").text("Level " + level);

  // Random Color Selected
  randomNumber = Math.round(Math.random() * 3);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  var chosenButton = $("#" + randomChosenColor);
  chosenButton.fadeOut(100).fadeIn(100);

}

// Button Sound Function
function playSound(name) {
  var chosenSound = new Audio("sounds/" + name + ".mp3");
  chosenSound.play();
}

// Button Animation Function
function animatePress(currentColor) {
  var chosenButton = $("#" + currentColor);
  chosenButton.addClass("pressed");
  setTimeout(function () {
      chosenButton.removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === (gamePattern.length-1)) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    gameOver();
  }
}
// Start again after game is over
function startOver() {
  $(document).one("keypress", function(event) {
    $("#level-title").text("Level 0");
    gamePattern = [];
    level = 0;
    nextSequence();
  });
}

// Game Over Function
function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
      $("body").removeClass("game-over");}, 200);
  startOver();
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  var lastLevel = userClickedPattern.length - 1;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(lastLevel);
})


// When a key is pressed, the game starts
$(document).one("keypress", function(event) {
  $("#level-title").text("Level 0");
  nextSequence();
});
