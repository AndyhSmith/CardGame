




// Functions
function showInstructions() {
    Interface.SetDivContents("message", new Menu().getInstructions());
}

function showAbout() {
    Interface.SetDivContents("message", new Menu().getAbout());
}

function endTurn() {
    controller.endTurn();
}

function restart() {
    controller.restart();
}

function drawCard() {
    controller.drawCard();
}

function playCard(id) {
    controller.playCard(id);
}

function buyCard(id) {
    controller.buyCard(id);
}

function toggleStore() {
    controller.toggleStore();
}

function toggleDeck() {
    controller.toggleDeck();
}

function toggleDiscard() {
    controller.toggleDiscard();
}



// Initial Div Setup
Interface.SetDivContents("title", new Menu().getTitle());

// Set minimum height of play areas
document.getElementById("hand").style.minHeight = (cardHeight + 30) + "px";
document.getElementById("play-area").style.minHeight = (cardHeight + 30) + "px";

// Game Setup
var controller = new GameController();
controller.addPlayer(new Player("Andy"));
controller.addPlayer(new Player("Bob"));

controller.startGame();