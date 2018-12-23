Skeleton = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Skeleton';

    this.animations.add('down', [9, 10, 11], 10, true);
    this.animations.add('left', [21, 22, 23], 10, true);
    this.animations.add('right', [33, 34, 35], 10, true);
    this.animations.add('up', [45, 46, 47], 10, true);
};

Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;