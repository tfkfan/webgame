Fireball = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superFireball',
                            [0], 10, false);
    this.isAnimated = false;
    this.absoluteVelocity = 1000;
};

Fireball.prototype = Object.create(Skill.prototype);
Fireball.prototype.constructor = Fireball;
Fireball.prototype.onUpdate = function(skill){
    skill.body.velocity.x = skill.customVelocity.x;
    skill.body.velocity.y = skill.customVelocity.y;
};
Fireball.prototype.onStart = function(attacker, skill, target){
    var velocity = new Phaser.Point(target.x - skill.x, target.y - skill.y);
    velocity = velocity.normalize();
    velocity = velocity.multiply( this.absoluteVelocity,  this.absoluteVelocity);

    skill.customVelocity = velocity;
    skill.scale.setTo(0.03);
    skill.body.enable = true;
    skill.animations.play("superFireball");
    return skill;
};