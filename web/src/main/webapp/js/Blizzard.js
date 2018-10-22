Blizzard = function (game, name, image, rate, range) {
    Skill.call(this, game, name, image, rate, range);
    this.callAll('animations.add', 'animations', 'skills',
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

      a.reset(randX - 150, randY - 250);

      var tween = this.game.add.tween(a).to( { x: randX, y: randY}, 1000);
      tween.onComplete.add(function(){
          a.animations.play("skills");
          a.events.onAnimationComplete.add(function(event){
              event.kill();
              a.animations.stop(null, true);
          }, this);
      }, this);
      tween.start();

      this.lastAttack = this.game.time.now;


      // a.reset(p.worldX - 100, p.worldY - 250);
      // a.rotation = this.game.physics.arcade.moveToXY(a, attacks.range);
      //a.reset(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
      //a.rotation = this.game.physics.arcade.moveToPointer(a, attacks.range);
      a.animations.play("staticSpell");

};