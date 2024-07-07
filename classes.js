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
        this.cardHeight = cardHeight;
        this.cardWidth = this.cardHeight * (25/35);
        this.buffs = cards[this.name].buffs;
        this.cost= cards[this.name].cost;
        cardID++;
    }
    getBuff(type) {
        if (this.buffs.hasOwnProperty(type)) {
            return this.buffs[type];
        }
        return 0
    }


    getCSSOutline(color) {
        return "outline: 1px " + pSBC(-0.42, color) + " solid; "
    }

    getHTMLStyle(color) {
        return "style='" + this.getCSSOutline(color) + "'"
    }

    getHTML(id, htmlId) {
        let s =  "<div class='card bord' style='"
        
        // Set card size
        s += "height: " + this.cardHeight + "px; width: " + this.cardWidth + "px; "
        // Set font size based on card size
        s += "font-size: " + this.cardHeight / 25 + "px; "


        // Set background color based on card type
        let bgc = "";
        if (cards[this.name].type == "Food") {
            bgc = "#FFDB58"
        }
        else if (cards[this.name].type == "Worker") {
            bgc = "#add8e6"
        }
        else if (cards[this.name].type == "Crafted") {
            bgc = "#FFA07A"
        }
        else if (cards[this.name].type == "Building") {
            bgc = "#90EE90"
        }
        else if (cards[this.name].type == "Pet") {
            bgc = "#C0C0C0"
        }

        s += "background-color: " + bgc + "; " 
        s += this.getCSSOutline(bgc)
        s += "' " 
        
        // Card onclick events
        if (htmlId == "hand") {
            s += "onclick='playCard(" + id + ")'"
        }
        if (htmlId == "store") {
            s += "onclick='buyCard(" + id + ")'"
        }
        s += ">"
        s += "<div class='card-title' " + this.getHTMLStyle(bgc) + ">" + this.name + "</div>" 
        s += "<img  " + this.getHTMLStyle(bgc) + " src='img/" + cards[this.name].img + "' alt='" + this.name + "'>" 
        
        // Description
        s += "<div class='card-description'  " + this.getHTMLStyle(bgc) + ">" 
        s += cards[this.name].description + "<br>"
        for (let key in cards[this.name].buffs) {
            if (cards[this.name].buffs.hasOwnProperty(key)) {
                s += "+" + cards[this.name].buffs[key] + " " + key + "<br>"
            }
        }
        s += "<div class='card-type' style='color:" + pSBC(-0.8, bgc) + ";'>" + cards[this.name].type + "</div>"
        s += "</div>" // End card-description

        
        // Card Cost
        let hasCost = false;
        s += "<div class='card-cost'  " + this.getHTMLStyle(bgc) + "> " 
        for (let key in cards[this.name].cost) {
            if (cards[this.name].cost.hasOwnProperty(key)) {
                s += cards[this.name].cost[key] + " " + key + "<br>"
                hasCost = true;
            }
        }
        if (hasCost == false) {
            s += "Free"
        }

        s += "</div>" // End card-cost
        s += "</div>"; // End card
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
        this.population = 0;
        this.food = 0;
        this.showStore = true;
        this.showDiscard = false;
        this.showDeck = false;
    }
    addCard(location, card) {
        location.push(card);
    }
    drawCard() {
        if (this.deck.length == 0) {
            if (this.discard.length == 0) {
                return;
            }
            this.deck = this.discard;
            this.discard = [];
            this.shuffleCards(this.deck);
        }
        let nextCard = this.deck.pop();
        this.hand.push(nextCard);

    }
    startTurn() {
        //Draw 5 cards
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }
 
        // Set up starting messages
        Interface.SetDivContents("message", "It's " + this.name + "'s turn.");
        Interface.SetDivContents("stats", "Population: " + this.population + "<br>Food: " + this.food);
    }
    endTurn() {
        this.discard = this.discard.concat(this.hand);
        this.hand = [];
        this.discard = this.discard.concat(this.playArea);
        this.playArea = [];
        this.population = 0;
        this.food = 0;
    }
    displayCards(title, htmlId, location) {
        let cardString = title + " (" + location.length + ") ";
        
        // Handle Toggle Button
        let display = true;

        
        // Store
        if (htmlId == "store") {
            cardString += "(<span class='text-button' onclick='toggleStore()'>"
            if (this.showStore == false) {
                display = false;
                cardString += "Show"
            } 
            else {
                cardString += "Hide"
            }
            cardString += "</span>)"
        }

        // Discard
        if (htmlId == "discard") {
            cardString += "(<span class='text-button' onclick='toggleDiscard()'>"
            if (this.showDiscard == false) {
                display = false;
                cardString += "Show"
            } 
            else {
                cardString += "Hide"
            }
            cardString += "</span>)"
        }

        // Deck
        if (htmlId == "deck") {
            cardString += "(<span class='text-button' onclick='toggleDeck()'>"
            if (this.showDeck == false) {
                display = false;
                cardString += "Show"
            } 
            else {
                cardString += "Hide"
            }
            cardString += "</span>)"
        }


        cardString += "<br>";

        if (display == true) {
            // Add Cards
            for (let i = 0; i < location.length; i++) {
                cardString += location[i].getHTML(i, htmlId) + " ";
            }
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
        this.addCard(this.deck, this.makeCard("wheat"));
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

    playCard(id) {
        let playedCard = this.hand[id];
        this.playArea.push(playedCard);
        this.hand.splice(id, 1);

        // Calculate Affects
        this.population += playedCard.getBuff("Worker");
        this.food += playedCard.getBuff("Food");
        Interface.SetDivContents("stats", "Worker: " + this.population + "<br>Food: " + this.food);
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


        this.players[this.currentPlayer].startTurn();
        this.renderCards();
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
        this.players[this.currentPlayer].playCard(id);
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

    toggleStore() {
        this.players[this.currentPlayer].showStore = !this.players[this.currentPlayer].showStore;
        this.renderCards();
    }

    toggleDeck() {
        this.players[this.currentPlayer].showDeck = !this.players[this.currentPlayer].showDeck;
        this.renderCards();
    }

    toggleDiscard() {
        this.players[this.currentPlayer].showDiscard = !this.players[this.currentPlayer].showDiscard;
        this.renderCards();
    }
}
