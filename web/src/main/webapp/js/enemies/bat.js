Bat = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Bat';

    this.animations.add('down', [51, 52, 53], 10, true);
    this.animations.add('left', [63, 64, 65], 10, true);
    this.animations.add('right', [75, 76, 77], 10, true);
    this.animations.add('up', [87, 88, 89], 10, true);
};

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;