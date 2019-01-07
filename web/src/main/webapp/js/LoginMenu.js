WebGame.LoginMenu = function (game) {};

WebGame.LoginMenu.prototype = {
    init: function(score) {

    },
	create: function () {
	    var _THIS = this;

	    var style =  { font: "35px Arial", fill: "#ffffff", align: "center" };
        this.playerNameLabel = this.game.add.text(this.game.width/2, this.game.height - 25, 'Input the player name and press start!', style);
        this.playerNameLabel.anchor.set(0.5);

        var style =  { font: "65px Arial", fill: "#99ccff", align: "center" };
        this.playerName = this.game.add.text(this.game.width/2, this.game.height/2 - 30, '', style);
        this.playerName.anchor.set(0.5);

        var style =  { font: "65px Arial", fill: "#ffe066", align: "center" };
        this.btn = new LabelButton(this.game, this.game.width/2, this.game.height/2 + 100, "Start a game!", style,
            function(event){
                 var context = {
                     playerName : _THIS.playerName.text
                 };
                 this.game.state.start('Game', true, false, context);
            }
         );

        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.backspace.onDown.add(this.onBackSpaceDown, this);

        this.game.input.keyboard.addCallbacks(this, null, null, this.onKeyPress);
	},

	onBackSpaceDown: function(event){
	    var text = this.playerName.text;
	    this.playerName.text = text.substring(0, text.length - 1);
	},

	onKeyPress: function(char){
	    var text = this.playerName.text;
        this.playerName.text = text + char;
	},

	update: function () {
	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	},

	shutdown: function() {
	    this.music = null;
	    this.splash = null;
        this.score = null;
        this.instructions = null;
        this.background = null;
        this.playButton = null;
    }
};
