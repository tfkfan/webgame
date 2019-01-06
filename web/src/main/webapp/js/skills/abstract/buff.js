Buff = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.isBuff = true;
};

Buff.prototype = Object.create(Skill.prototype);
Buff.prototype.constructor = Buff;
Buff.prototype.onUpdate = function(skill){
   skill.x = this.model.player.x - this.model.player.height/3;
   skill.y = this.model.player.y;
};
Buff.prototype.onAnimationStart = function(skill){
};
Buff.prototype.onBuffAction = function(summoner){
};
Buff.prototype.onStart = function(attacker, skill, activePointer){
    skill.body.enable = false;
    this.onAnimationStart(skill);
    this.onBuffAction(attacker);
    return skill;
};