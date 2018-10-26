Blizzard = function (game, name, image, rate, range) {
    Skill.call(this, game, name, image, rate, range);
    this.callAll('animations.add', 'animations', 'blizzard',
                            [0, 1, 2, 3], 10, false);
};

Blizzard.prototype = Object.create(Skill.prototype);
Blizzard.prototype.constructor = Blizzard;
Blizzard.prototype.run = function(a){
      var p = this.game.input.activePointer;

      var rx1 = p.worldX - 100;
      var ry1 = p.worldY - 50;
      var rx2 = p.worldX + 100;
      var ry2 = p.worldY + 50;

      var randX = getRandomNum(rx1, rx2);
      var randY = getRandomNum(ry1, ry2);

      if(a.body.isFalling === undefined || a.body.isFalling)
        a.body.enable = false;

      a.reset(randX - 150, randY - 250);

      var tween = this.game.add.tween(a).to( { x: randX, y: randY}, 500);
      tween.onComplete.add(function(){
          a.animations.play("blizzard");
          a.body.isFalling = false;
          a.body.enable = true;
          a.events.onAnimationComplete.add(function(event){
              event.kill();
              a.animations.stop(null, true);
              a.body.isFalling = true;
          }, this);
      }, this);
      tween.start();

     // a.animations.play("blizzard0");
};