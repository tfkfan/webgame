Fireball = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superFireball',
                            [0], 10, false);
};

Fireball.prototype = Object.create(Skill.prototype);
Fireball.prototype.constructor = Fireball;
Fireball.prototype.update = function(){
    Skill.prototype.update.call(this);
};
Fireball.prototype.run = function(attacker){
    var skill = Skill.prototype.run.call(this, attacker);
    skill.scale.setTo(0.03);
    skill.lifespan = 20*100;
    skill.body.enable = true;
    skill.animations.play("superFireball");

    this.game.physics.arcade.moveToObject(skill, this.game.input.activePointer, 1000);
};