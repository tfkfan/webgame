Player = function (gameController, x,y, spritename, name) {
   Phaser.Sprite.call(this, gameController.game, x, y, spritename);

   this.gameController = gameController;
   this.scale.setTo(2);
   this.game.physics.arcade.enable(this);
   this.direction = 'up';
   this.body.collideWorldBounds = true
   this.alive = true;
   this.name = name;
   this.level = 1;
   this.health = 100;
   this.maxHealth = 100;
   this.strength = 85;
   this.speed = 125;
   this.invincibilityFrames = 500;
   this.invincibilityTime = 0;
   this.corpseSprite = 1;
   this.xp = 0;
   this.xpToNext = 20;

   this.initAnimations();
   this.animations.play(this.direction);

   var style = { font: '14px Arial', fill: '#fff', align: 'center' };
   this.nameLabel = this.game.add.text(this.x, this.y - 75, this.name, style);

   this.hpLine = new Phaser.Rectangle(this.x, this.y - 75, this.width, 5);
   this.emptyHpLine = new Phaser.Rectangle(this.x, this.y - 75, this.width, 5);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
    this.nameLabel.x = this.x + this.width/3;
    this.nameLabel.y = this.y - 5;

    this.hpLine.x = this.x;
    this.hpLine.y = this.y + 20;
    this.emptyHpLine.x = this.x;
    this.emptyHpLine.y = this.y + 20;

    this.hpLine.width = this.width*(this.health/this.maxHealth);
    this.emptyHpLine.width = this.width;

    this.game.debug.geom(this.emptyHpLine,'#ff0000');
    this.game.debug.geom(this.hpLine,'#008000');
};

Player.prototype.levelUp = function() {
    this.level++;
    this.maxHealth += 5;
    this.health += 5;
    this.strength += 1;
    this.speed += 1;
    this.xp -= this.xpToNext;
    this.xpToNext = Math.floor(this.xpToNext * 1.1);
    this.gameController.notification = this.name + ' has advanced to level ' + this.level + '!';
    this.gameController.levelSound.play();

    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('levelParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
};

Player.prototype.initAnimations = function(){
};
