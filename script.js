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

// Initial Div Setup
Interface.SetDivContents("title", new Menu().getTitle());

// Game Setup
var controller = new GameController();
controller.addPlayer(new Player("Andy"));
controller.addPlayer(new Player("Bob"));

controller.startGame();