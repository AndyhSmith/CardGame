// Purpose: Contains all the classes for the game.

class Interface {
    static SetDivContents(div, contents) {
        document.getElementById(div).innerHTML = contents;
    }
}

class Menu {
    // Menu class
    getTitle() {
        return "" +
            "┏┓┳┓┏┳┓┳┏┓┳┏┓┏┓" + "<br>" +
            "┣┫┣┫ ┃ ┃┣ ┃┃ ┣ " + "<br>" +
            "┛┗┛┗ ┻ ┻┻ ┻┗┛┗┛";
    }
}

class Card {
    // Card class
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }
}

class Player {
    // Player class
    constructor(name) {
        this.name = name;
        this.deck = [];
        this.hand = [];
    }

    addCard(card) {
        this.deck.push(card);
    }

    drawCard() {
        this.hand.push(this.deck.pop());
    }

    startTurn() {
        Interface.SetDivContents("message", "It's " + this.name + "'s turn.");
    }

    reset() {
        this.hand = [];
    }   
}

class GameController {
    // GameController class
    constructor() {
        this.players = [];
        this.currentPlayer = 0;
    }

    addPlayer(player) {
        this.players.push(player);
    }

}
