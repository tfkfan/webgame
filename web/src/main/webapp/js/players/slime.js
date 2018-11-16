Slime = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Slime';

    this.animations.add('down', [48, 49, 50], 10, true);
    this.animations.add('left', [60, 61, 62], 10, true);
    this.animations.add('right', [72, 73, 74], 10, true);
    this.animations.add('up', [84, 85, 86], 10, true);
};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;