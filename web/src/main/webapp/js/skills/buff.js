Buff = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superBuff',
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                            12, 13, 14, 15, 16, 17, 18, 19], 10, false);
    this.isBuff = true;
};

Buff.prototype = Object.create(Skill.prototype);
Buff.prototype.constructor = Buff;
Buff.prototype.update = function(){
    Skill.prototype.update.call(this);
    this.forEachAlive(function(skill) {
       skill.x = this.model.player.x - this.model.player.height/3;
       skill.y = this.model.player.y;
    }, this);
};
Buff.prototype.run = function(attacker){
    var skill = Skill.prototype.run.call(this, attacker);
    skill.lifespan = 19*100;
    skill.body.enable = true;
    skill.animations.play("superBuff");

    attacker.health += this.rate;
};