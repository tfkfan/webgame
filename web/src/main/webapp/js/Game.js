WebGame.Game = function (game) {
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
};

WebGame.Game.prototype = {
    create: function () {
        var worldSize = 1920;
        this.game.world.setBounds(0, 0, worldSize, worldSize);
        this.background = this.game.add.tilemap('worldmap');
        this.background.addTilesetImage('tiles', 'tiles');

        this.mainlayer = this.background.createLayer('tiles layer');
        //this.obstacleslayer = this.background.createLayer('ground');
            //  This resizes the game world to match the layer dimensions
        this.mainlayer.resizeWorld();
        //this.obstacleslayer.resizeWorld();

        this.generateGrid(worldSize);

        this.notification = '';
        //main game model stats
        this.gold = 0;
        this.goldForBoss = 1000;
        this.bossSpawned = false;

       // this.generateObstacles();
        this.corpses = this.game.add.group();
        // Generate player and set camera to follow
        this.player = new Mage(this, this.game.world.centerX, this.game.world.centerY, 'mage','artemka');
        this.game.add.existing(this.player);
        this.game.camera.follow(this.player);

        //this.generateAttacks('staticSpell', 'skills');
        //this.playerSpells = this.generateAttacks('spell');
        //this.playerSpells2 = this.generateAttacks('spell2');
        this.bossAttacks = this.game.add.group();

        // Generate enemies - must be generated after player and player.level
        this.bosses = new Bosses(this, this.player, this.corpses, 'bosses');
        this.enemies = new Enemies(this, this.player, this.corpses, 'characters');
        for (var i = 0; i < 2; i++)
            this.enemies.generate();

        this.collectables = new Collectables(this, this.player, 'characters');
        this.collectables.generateChests(100);
        // Generate bosses
        this.bosses = this.game.add.group();
        this.bosses.enableBody = true;
        this.bosses.physicsBodyType = Phaser.Physics.ARCADE;
        // Music
		this.music = this.game.add.audio('overworldMusic');
		this.music.loop = true;
		//this.music.play();
        // Sound effects
        this.generateSounds();
        // Set the camera
        this.showLabels();
    },
    // Checks for actions and changes
    update: function () {
        this.collisionHandler();
        this.notificationLabel.text = this.notification;
        this.xpLabel.text = 'Lvl. ' + this.player.level + ' - ' + this.player.xp + ' XP / ' + this.player.xpToNext + ' XP';
        this.goldLabel.text = this.gold + ' Gold';
        this.healthLabel.text = this.player.health + ' / ' + this.player.maxHealth;
    },

    levelUpHandler: function(){
        this.notification = this.player.name + ' has advanced to level ' + this.player.level + '!';
        this.levelSound.play();
    },

    collisionHandler: function() {
        this.game.physics.arcade.collide(this.player, this.enemies, this.hit, null, this);
        this.game.physics.arcade.collide(this.player, this.bosses, this.hit, null, this);
        this.game.physics.arcade.collide(this.player, this.bossAttacks, this.hit, null, this);
        this.game.physics.arcade.collide(this.bosses, this.player.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.collide(this.enemies, this.player.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.player.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.player.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.collide(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.collide(this.enemies, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.player.playerAttacks, null, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.enemies, null, null, this);
        this.game.physics.arcade.overlap(this.collectables, this.player, this.collect, null, this);
    },

    showLabels: function() {
        var text = '0';
        style = { font: '10px Arial', fill: '#fff', align: 'center' };
        this.notificationLabel = this.game.add.text(25, 25, text, style);
        this.notificationLabel.fixedToCamera = true;

        style = { font: '10px Arial', fill: '#ffd', align: 'center' };
        this.xpLabel = this.game.add.text(25, this.game.height - 25, text, style);
        this.xpLabel.fixedToCamera = true;

        style = { font: '20px Arial', fill: '#f00', align: 'center' };
        this.healthLabel = this.game.add.text(225, this.game.height - 50, text, style);
        this.healthLabel.fixedToCamera = true;

        var style = { font: '10px Arial', fill: '#fff', align: 'center' };
        this.goldLabel = this.game.add.text(this.game.width - 75, this.game.height - 25, text, style);
        this.goldLabel.fixedToCamera = true;
    },

    attack: function (attacker, attacks) {
        if (attacker.alive && this.game.time.now > attacks.next) {
            attacks.next = this.game.time.now + 30;
            var a = attacks.getFirstDead();

           // a.scale.setTo(1.5);
            a.name = attacker.name;
            a.strength = attacks.damage;
            a.reset(attacker.x, attacker.y);
           // a.lifespan = 10*attacks.rate;
            console.log(attacker.name + " used " + attacks.name + "!");

            attacks.run(a);
            /* else if (attacks.name === 'spell') {
               // a.rotation = this.game.physics.arcade.moveToPointer(a, attacks.range);
                a.effect = 'spell';
                a.strength *= 6;
                this.fireballSound.play();
            } else if (attacks.name === 'fireball') {
                a.rotation = this.game.physics.arcade.moveToObject(a, this.player, attacks.range);
                this.fireballSound.play();
            }*/
        }
    },

    hit: function (target, attacker) {
        if(target === this.player && attacker.parent === this.player.playerAttacks){
            return;
        }
        if (this.game.time.now > target.invincibilityTime) {
            target.invincibilityTime = this.game.time.now + target.invincibilityFrames;
            target.damage(attacker.strength)
            if (target.health < 0)
                target.health = 0;
            //attacker.active = false;
            this.playSound(target.name);
            this.notification = attacker.name + ' caused ' + attacker.strength + ' damage to ' + target.name + '!';
            if (attacker.effect === 'spell') {
                var emitter = this.game.add.emitter(attacker.x, attacker.y, 100);
                emitter.makeParticles('spellParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 1000, null, 100);
            }
        }
    },

    collect: function(player, collectable) {
        if (!collectable.collected) {
            collectable.collected = true;
            var gain;
            if (collectable.name === 'gold') {
                gain = this.player.level + Math.floor(Math.random() * 10);
                this.gold += collectable.value;
                this.goldSound.play();
                this.notification = 'You pick up ' + collectable.value + ' gold.';
                collectable.destroy();
            } else if (collectable.name === 'chest') {
                collectable.animations.play('open');
                this.gold += collectable.value;
                this.goldSound.play();
                this.notification = 'You open a chest and find ' + collectable.value + ' gold!';
                collectable.lifespan = 1000;
            } else if (collectable.name === 'healthPotion') {
                player.health += collectable.value;
                this.notification = 'You consume a potion, healing you for ' + collectable.value + ' health.';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === 'vitalityPotion') {
                player.maxHealth += collectable.value;
                this.notification = 'You consume a potion, increasing your maxHealth by ' + collectable.value + '!';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === 'strengthPotion') {
                player.strength += collectable.value;
                this.notification = 'You consume a potion, increasing your strength by ' + collectable.value + '!';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === 'speedPotion') {
                player.speed += collectable.value;
                this.notification = 'You consume a potion, increasing your speed by  ' + collectable.value + '!';
                this.potionSound.play();
                collectable.destroy();
            }
        }
    },

    deathHandler: function(target) {
        var corpse = this.corpses.create(target.x, target.y, 'dead')
        corpse.scale.setTo(2);
        corpse.animations.add('idle', [target.corpseSprite], 0, true);
        corpse.animations.play('idle');
        corpse.lifespan = 3000;
        target.destroy();
    },

    playSound: function (name) {
        if (name === this.player.name)
            this.playerSound.play();
        else if (name === 'Skeleton')
            this.skeletonSound.play();
        else if (name === 'Slime')
            this.slimeSound.play();
        else if (name === 'Bat')
            this.batSound.play();
        else if (name === 'Ghost')
            this.ghostSound.play();
        else if (name === 'Spider')
            this.spiderSound.play();
        else if (name === 'Dragon')
             this.dragonSound.play();
    },

    generateSounds: function () {
        this.attackSound = this.game.add.audio('attackSound');
        this.batSound = this.game.add.audio('batSound');
        this.fireballSound = this.game.add.audio('fireballSound');
        this.dragonSound = this.game.add.audio('dragonSound');
        this.ghostSound = this.game.add.audio('ghostSound');
        this.goldSound = this.game.add.audio('goldSound');
        this.levelSound = this.game.add.audio('levelSound');
        this.playerSound = this.game.add.audio('playerSound');
        this.potionSound = this.game.add.audio('potionSound');
        this.skeletonSound = this.game.add.audio('skeletonSound');
        this.slimeSound = this.game.add.audio('slimeSound');
        this.spiderSound = this.game.add.audio('spiderSound');
    },

    gameOver: function() {
        this.background.destroy();
        this.corpses.destroy();
        this.collectables.destroy();
        this.player.destroy();
        this.player.playerAttacks.destroy();
        this.enemies.destroy();
		this.music.stop();
		this.music.destroy();
        this.attackSound.destroy();
        this.playerSound.destroy();
        this.skeletonSound.destroy();
        this.slimeSound.destroy();
        this.batSound.destroy();
        this.ghostSound.destroy();
        this.spiderSound.destroy();
        this.goldSound.destroy();
        this.game.state.start('MainMenu', true, false, this.player.xp + this.gold);
    },

    quitGame: function (pointer) {
		this.music.stop();
        this.game.state.start('MainMenu', true, false, this.player.xp + this.gold);
    },

    getRandomLocation: function() {
        var gridIndex = 0;
        var x = this.grid[gridIndex].x;
        var y = this.grid[gridIndex].y;
        this.grid.splice(gridIndex, 1);
        gridIndex++;
        if (gridIndex === this.grid.length) {
            this.shuffle(this.grid);
            gridIndex = 0;
        }
        return {x, y};
    },

    generateGrid: function (worldSize) {
        this.grid = [];
        var gridSize = 32;
        var grids = Math.floor(worldSize / gridSize);
        for (var x = 0; x < grids; x++) {
            for (var y = 0; y < grids; y++) {
                var gridX = x * gridSize;
                var gridY = y * gridSize;
                this.grid.push({x:gridX, y:gridY});
            }
        }
        shuffle(this.grid);
    }
};
