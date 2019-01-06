ThrownSkill = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.absoluteVelocity = 1000;
};

ThrownSkill.prototype = Object.create(Skill.prototype);
ThrownSkill.prototype.constructor = ThrownSkill;
ThrownSkill.prototype.onUpdate = function(skill){
    skill.body.velocity.x = skill.customVelocity.x;
    skill.body.velocity.y = skill.customVelocity.y;
};
ThrownSkill.prototype.onStart = function(attacker, skill, target){
    var velocity = new Phaser.Point(target.x - skill.x, target.y - skill.y);
    velocity = velocity.normalize();
    velocity = velocity.multiply( this.absoluteVelocity,  this.absoluteVelocity);

    skill.customVelocity = velocity;
    skill.body.enable = true;
    return skill;
};