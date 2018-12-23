VitalityPotion = function(game, x, y, value){
    var img = 'potions';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.animations.add('idle', [2], 0, true);
    this.animations.play('idle');
    this.name = 'vitalityPotion'
    this.value = value;
};

VitalityPotion.prototype = Object.create(Phaser.Sprite.prototype);
VitalityPotion.prototype.constructor = VitalityPotion;