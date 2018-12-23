Gold = function(game, x, y, value){
    var img = 'sprites';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.animations.add('idle', [68], 0, true);
    this.animations.play('idle');
    this.name = 'gold';
    this.value = value;
};

Gold.prototype = Object.create(Phaser.Sprite.prototype);
Gold.prototype.constructor = Gold;