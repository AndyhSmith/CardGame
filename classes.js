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

    getInstructions() {
        return "Welcome to Artifice, a deck building game where you compete to own the territory."
    }

    getAbout() {
        return "Artifice is a game created by Andy."
    }
}

class Card {
    // Card class
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.cardID = cardID;
        cardID++;
    }
    getHTML(id, htmlId) {
        let s =  "<div class='card bord' " 
        if (htmlId == "hand") {
            s += "onclick='playCard(" + id + ")'"
        }
        if (htmlId == "store") {
            s += "onclick='buyCard(" + id + ")'"
        }
        s += ">"
        s += "<div class='card-title bord'>" + this.name + "</div>" 
        s += "<img class='bord' src='img/" + cards[this.name].img + "' alt='" + this.name + "'>" 
        s += "<div class='card-description bord'>" 
        s += cards[this.name].description + "<br>"
        for (let key in cards[this.name].buffs) {
            if (cards[this.name].buffs.hasOwnProperty(key)) {
                s += "+" + cards[this.name].buffs[key] + " " + key + "<br>"
            }
        }
        // if (cards[this.name].buffs) { s += "+" + cards[this.name].buffs.action + " Action <br>" }
        s += "</div>" 
        s += "<div class='card-type bord'>" + cards[this.name].type + "</div>" 
        s += "</div>";
        return s;
    }
}

class Player {
    // Player class
    constructor(name) {
        this.name = name;
        this.deck = [];
        this.hand = [];
        this.discard = [];
        this.playArea = [];
        this.store = [];
    }
    addCard(location, card) {
        location.push(card);
    }
    drawCard() {
        this.hand.push(this.deck.pop());
    }
    startTurn() {
        Interface.SetDivContents("message", "It's " + this.name + "'s turn.");
    }
    endTurn() {
        this.discard = this.discard.concat(this.hand);
        this.hand = [];
        this.discard = this.discard.concat(this.playArea);
        this.playArea = [];
    }
    displayCards(title, htmlId, location) {
        let cardString = title + "<br>";
        for (let i = 0; i < location.length; i++) {
            cardString += location[i].getHTML(i, htmlId) + " ";
        }
        Interface.SetDivContents(htmlId, cardString);
    }
    buildStartingDeck() {
        // for (let i = 0; i < 7; i++) {
        //     this.addCard(this.deck, this.makeCard("bread"));
        // }
        // for (let i = 0; i < 3; i++) {
        //     this.addCard(this.deck, this.makeCard("villager"));
        // }
        // this.shuffleCards(this.deck);
        this.addCard(this.deck, this.makeCard("bread"));
        this.addCard(this.deck, this.makeCard("villager"));
    }
    buildStore() {
        for (let key in cards) {
            if (cards.hasOwnProperty(key)) {
                this.addCard(this.store, this.makeCard(key));
            }
        }
    }
    makeCard(name)  {
        return new Card(name, 1, 1);
    }
    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
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
    startGame() {
        // Set up starting deck
        this.players[0].buildStartingDeck();
        this.players[0].buildStore();


        this.renderCards();
        this.players[this.currentPlayer].startTurn();
    }
    drawCard() {
        if (this.players[this.currentPlayer].deck.length == 0) {
            if (this.players[this.currentPlayer].discard.length == 0) {
                return;
            }
            this.players[this.currentPlayer].deck = this.players[this.currentPlayer].discard;
            this.players[this.currentPlayer].discard = [];
            this.players[this.currentPlayer].shuffleCards(this.players[this.currentPlayer].deck);
        }
        this.players[this.currentPlayer].drawCard();
        this.renderCards();
    }
    renderCards() {
        this.players[this.currentPlayer].displayCards("Hand", "hand", this.players[this.currentPlayer].hand);
        this.players[this.currentPlayer].displayCards("Deck", "deck", this.players[this.currentPlayer].deck);
        this.players[this.currentPlayer].displayCards("Discard", "discard", this.players[this.currentPlayer].discard);
        this.players[this.currentPlayer].displayCards("Play Area", "play-area", this.players[this.currentPlayer].playArea);
        this.players[this.currentPlayer].displayCards("Store", "store", this.players[this.currentPlayer].store);
    }

    playCard(id) {
        this.players[this.currentPlayer].playArea.push(this.players[this.currentPlayer].hand[id]);
        this.players[this.currentPlayer].hand.splice(id, 1);
        this.renderCards();
    }

    endTurn() {
        this.players[this.currentPlayer].endTurn();
        this.currentPlayer++;
        if (this.currentPlayer >= this.players.length) {
            this.currentPlayer = 0;
        }
        this.players[this.currentPlayer].startTurn();
        this.renderCards();
    }

    buyCard(id) {
        this.players[this.currentPlayer].discard.push(this.players[this.currentPlayer].store[id]);
        // this.players[this.currentPlayer].store.splice(id, 1);
        this.renderCards();
    }
}
