Player = function (game, x,y, spritename, name) {
   Phaser.Sprite.call(this, game, x, y, spritename);
   this.initAnimations();

   this.scale.setTo(2);
   this.game.physics.arcade.enable(this);
   this.direction = 'up';
   this.body.collideWorldBounds = true
   this.alive = true;
   this.name = name;
   this.level = 1;
   this.health = 100;
   this.vitality = 100;
   this.strength = 85;
   this.speed = 125;
   this.invincibilityFrames = 500;
   this.invincibilityTime = 0;
   this.corpseSprite = 1;

   this.animations.play(this.direction);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.initAnimations = function(){
};
