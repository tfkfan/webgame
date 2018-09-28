// If the object exists already, we�ll use it, otherwise we�ll use a new object
var WebGame = WebGame || {};
// Initiate a new game and set the size of the entire windows
// Phaser.AUTO means that whether the game will be rendered on a CANVAS element or using WebGL will depend on the browser
WebGame.game = new Phaser.Game(512, 384, Phaser.AUTO, '', null, false, false);

WebGame.game.state.add('Boot', WebGame.Boot);
WebGame.game.state.add('Preloader', WebGame.Preloader);
WebGame.game.state.add('MainMenu', WebGame.MainMenu);
WebGame.game.state.add('Game', WebGame.Game);

WebGame.game.state.start('Boot');