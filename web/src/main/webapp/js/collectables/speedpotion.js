SpeedPotion = function(game, x, y, value){
    var img = 'potions';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.animations.add('idle', [4], 0, true);
    this.animations.play('idle');
    this.name = 'speedPotion'
    this.value = value;
};

SpeedPotion.prototype = Object.create(Phaser.Sprite.prototype);
SpeedPotion.prototype.constructor = SpeedPotion;