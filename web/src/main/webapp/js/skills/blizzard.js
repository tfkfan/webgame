Blizzard = function (model, name, image, rate) {
    Skill.call(this, model, name, image, rate);
    this.callAll('animations.add', 'animations', 'blizzard',
                            [0, 1, 2, 3], 10, false);
};

Blizzard.prototype = Object.create(Skill.prototype);
Blizzard.prototype.constructor = Blizzard;
Blizzard.prototype.run = function(a){
      var p = this.game.input.activePointer;

      var rx1 = p.worldX - 50;
      var ry1 = p.worldY - 25;
      var rx2 = p.worldX + 50;
      var ry2 = p.worldY + 25;

      var randX = getRandomNum(rx1, rx2);
      var randY = getRandomNum(ry1, ry2);

      if(a.body.isFalling === undefined || a.body.isFalling)
        a.body.enable = false;

      a.reset(randX - 150, randY - 250);

      var tween = this.game.add.tween(a).to( { x: randX, y: randY}, 1000);
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
};