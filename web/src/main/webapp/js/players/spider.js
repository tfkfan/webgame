Spider = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Spider';

    this.animations.add('down', [57, 58, 59], 10, true);
    this.animations.add('left', [69, 70, 71], 10, true);
    this.animations.add('right', [81, 82, 83], 10, true);
    this.animations.add('up', [93, 94, 95], 10, true);
};

Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;