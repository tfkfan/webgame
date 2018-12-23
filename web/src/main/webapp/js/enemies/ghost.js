Ghost = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Ghost';

    this.animations.add('down', [54, 55, 56], 10, true);
    this.animations.add('left', [66, 67, 68], 10, true);
    this.animations.add('right', [78, 79, 80], 10, true);
    this.animations.add('up', [90, 91, 92], 10, true);
};

Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.prototype.constructor = Ghost;