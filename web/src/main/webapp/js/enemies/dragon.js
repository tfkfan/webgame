Dragon = function(game, x, y, colorIndex){
    var img = 'dragons';
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.arcade.enable(this);

    this.name = 'Dragon';

    if (colorIndex === 0) {
       this.animations.add('down', [0, 1, 2], 10, true);
       this.animations.add('left', [12, 13, 14], 10, true);
       this.animations.add('right', [24, 25, 26], 10, true);
       this.animations.add('up', [36, 37, 38], 10, true);
   } else if (colorIndex === 1) {
       this.animations.add('down', [3, 4, 5], 10, true);
       this.animations.add('left', [15, 16, 17], 10, true);
       this.animations.add('right', [27, 28, 29], 10, true);
       this.animations.add('up', [39, 40, 41], 10, true);
   } else if (colorIndex === 2) {
       this.animations.add('down', [6, 7, 8], 10, true);
       this.animations.add('left', [18, 19, 20], 10, true);
       this.animations.add('right', [30, 31, 32], 10, true);
       this.animations.add('up', [42, 43, 44], 10, true);
   } else if (colorIndex === 3) {
       this.animations.add('down', [9, 10, 11], 10, true);
       this.animations.add('left', [21, 22, 23], 10, true);
       this.animations.add('right', [33, 34, 35], 10, true);
       this.animations.add('up', [45, 46, 47], 10, true);
   } else if (colorIndex === 4) {
       this.animations.add('down', [57, 58, 59], 10, true);
       this.animations.add('left', [69, 70, 71], 10, true);
       this.animations.add('right', [81, 82, 83], 10, true);
       this.animations.add('up', [93, 94, 95], 10, true);
   } else if (colorIndex === 5) {
       this.animations.add('down', [54, 55, 56], 10, true);
       this.animations.add('left', [66, 67, 68], 10, true);
       this.animations.add('right', [78, 79, 80], 10, true);
       this.animations.add('up', [90, 91, 92], 10, true);
   } else if (colorIndex === 6) {
       this.animations.add('down', [51, 52, 53], 10, true);
       this.animations.add('left', [63, 64, 65], 10, true);
       this.animations.add('right', [75, 76, 77], 10, true);
       this.animations.add('up', [87, 88, 89], 10, true);
   } else if (colorIndex === 7) {
       this.animations.add('down', [48, 49, 50], 10, true);
       this.animations.add('left', [60, 61, 62], 10, true);
       this.animations.add('right', [72, 73, 74], 10, true);
       this.animations.add('up', [84, 85, 86], 10, true);
   }
};

Dragon.prototype = Object.create(Phaser.Sprite.prototype);
Dragon.prototype.constructor = Dragon;