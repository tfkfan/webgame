HealthPotion = function(game, x, y, value){
    var img = 'potions';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.animations.add('idle', [0], 0, true);
    this.animations.play('idle');
    this.name = 'healthPotion'
    this.value = value;
};

HealthPotion.prototype = Object.create(Phaser.Sprite.prototype);
HealthPotion.prototype.constructor = HealthPotion;