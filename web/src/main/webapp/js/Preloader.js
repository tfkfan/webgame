WebGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

WebGame.Preloader.prototype = {
	preload: function () {
		//this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		//this.splash.anchor.setTo(0.5);
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);
		//	Here we load the rest of the assets our game needs.
		this.load.image('playButton', 'assets/images/play.png');
		this.load.image('flame', 'assets/images/flame.png');
		this.load.image('sword', 'assets/images/sword.png');
		this.load.image('levelParticle', 'assets/images/level-particle.png');
		this.load.image('spellParticle', 'assets/images/spell-particle.png');

		this.load.atlas('mage', 'assets/playersheets/mage.png', 'assets/playersheets/mage_atlas.json');
		this.load.atlas('skills', 'assets/skillsheets/skills.png', 'assets/skillsheets/skills.json');

        this.load.tilemap('worldmap', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/maps/tiles.png');

		this.load.spritesheet('sprites', 'assets/images/tiles.png', 16, 16);
		this.load.spritesheet('things', 'assets/images/things.png', 16, 16);
		this.load.spritesheet('characters', 'assets/images/characters.png', 16, 16);
		this.load.spritesheet('dead', 'assets/images/dead.png', 16, 16);
		this.load.spritesheet('potions', 'assets/images/potions.png', 16, 16);
		this.load.spritesheet('dragons', 'assets/images/dragons.png', 32, 32);
		this.load.spritesheet('spell', 'assets/images/spell.png', 12, 12);
		this.load.spritesheet('fireball', 'assets/skillsheets/fire_002.png', 900, 800);
		this.load.spritesheet('iceblast', 'assets/skillsheets/s7.png', 255,130);
		this.load.spritesheet('staticSpell', 'assets/skillsheets/cast_004.png', 190, 192);

		this.load.audio('openingMusic', 'assets/sound/opening.ogg');
		this.load.audio('overworldMusic', 'assets/sound/overworld.ogg');
		this.load.audio('attackSound', 'assets/sound/attack.wav');
		this.load.audio('playerSound', 'assets/sound/player.wav');
		this.load.audio('skeletonSound', 'assets/sound/skeleton.wav');
		this.load.audio('slimeSound', 'assets/sound/slime.wav');
		this.load.audio('batSound', 'assets/sound/bat.wav');
		this.load.audio('ghostSound', 'assets/sound/ghost.wav');
		this.load.audio('spiderSound', 'assets/sound/spider.wav');
		this.load.audio('goldSound', 'assets/sound/gold.wav');
		this.load.audio('potionSound', 'assets/sound/potion.ogg');
		this.load.audio('levelSound', 'assets/sound/level.ogg');
		this.load.audio('fireballSound', 'assets/sound/fireball.wav');
		this.load.audio('dragonSound', 'assets/sound/dragon.wav');
	},

	create: function () {
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		if (this.cache.isSoundDecoded('openingMusic') && this.ready == false){
		 	this.ready = true;
		 	this.state.start('MainMenu');
		}
	}
};
