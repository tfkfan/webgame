Iceblast = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superIceblast',
                [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, false);
};

Iceblast.prototype = Object.create(Skill.prototype);
Iceblast.prototype.constructor = Iceblast;
Iceblast.prototype.update = function(){
    Skill.prototype.update.call(this);
};
Iceblast.prototype.run = function(attacker){
    var skill = Skill.prototype.run.call(this, attacker);
    skill.scale.setTo(1);
    //skill.lifespan = 10*100;
    skill.body.enable = true;
    skill.animations.play("superIceblast");

    var p = this.game.input.activePointer;
    skill.height = skill.width;
    skill.x = p.worldX - skill.width/2;
    skill.y = p.worldY - skill.height/2;

    skill.body.immovable = true;
    skill.body.moves = false;

    skill.events.onAnimationComplete.add(function(event){
         event.kill();
         skill.animations.stop(null, true);
    }, this);
};