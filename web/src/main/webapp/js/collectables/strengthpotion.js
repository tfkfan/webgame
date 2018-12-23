StrengthPotion = function(game, x, y, value){
    var img = 'potions';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.animations.add('idle', [3], 0, true);
    this.animations.play('idle');
    this.name = 'strengthPotion'
    this.value = value;
};

StrengthPotion.prototype = Object.create(Phaser.Sprite.prototype);
StrengthPotion.prototype.constructor = StrengthPotion;