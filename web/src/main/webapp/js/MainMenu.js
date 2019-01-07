WebGame.MainMenu = function (game) {};

WebGame.MainMenu.prototype = {
    init: function(score) {
        var score = score || 0;
        this.highestScore = this.highestScore || 0;
        this.highestScore = Math.max(score, this.highestScore);
    },
	create: function () {
		this.music = this.add.audio('openingMusic');
		this.music.loop = true;
		//this.music.play();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tiles', 92);

		// Give it speed in x
		this.background.autoScroll(-20, 0);
		//this.splash = this.add.image(this.game.width/2,this.game.height/2, 'logo');
		//this.splash.anchor.setTo(0.5);

        // High score
        text = "High score: "+this.highestScore;
        style = { font: "15px Arial", fill: "#fff", align: "center" };

        this.score = this.game.add.text(this.game.width/2, this.game.height - 50, text, style);
        this.score.anchor.set(0.5);

        // Instructions
        text = "Move: WASD Keys   Attack: Hold Left-Mouse Button   Spell: Spacebar";
        style = { font: "15px Arial", fill: "#fff", align: "center" };

        this.instructions = this.game.add.text(this.game.width/2, this.game.height - 25, text, style);
        this.instructions.anchor.set(0.5);
		this.playButton = this.add.button(this.game.width/2, this.game.height/2 + 100, 'playButton', this.startGame, this);
		this.playButton.anchor.setTo(0.5);
	},

	update: function () {
	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('LoginMenu');
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
