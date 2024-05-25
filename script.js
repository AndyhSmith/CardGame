console.log('Loaded script.js');

Interface.SetDivContents("title", new Menu().getTitle());


var controller = new GameController();
controller.startGame();