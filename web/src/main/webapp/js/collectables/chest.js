Chest = function(game, x, y){
    var img = 'things';

    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'chest';
    this.scale.setTo(2)
    this.animations.add('idle', [6], 0, true);
    this.animations.add('open', [18, 30, 42], 10, false);
    this.animations.play('idle');
    this.value = Math.floor(Math.random() * 150);
};

Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;