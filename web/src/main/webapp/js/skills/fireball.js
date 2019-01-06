Fireball = function (model, name, image, damage, rate) {
    ThrownSkill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superFireball',
                            [0], 10, false);
    this.isAnimated = false;
};
Fireball.prototype = Object.create(ThrownSkill.prototype);
Fireball.prototype.constructor = Fireball;
Fireball.prototype.onStart = function(attacker, skill, target){
    skill = ThrownSkill.prototype.onStart.call(this, attacker, skill, target);
    skill.scale.setTo(0.03);
    return skill;
};
Fireball.prototype.onCollide = function(skill, target){
    var sprite = this.game.add.sprite(target.x - target.width/2, target.y - target.height/2, 'fireballBlast', 5);
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    var animation = sprite.animations.add('runBlast', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                    11, 12, 13, 14, 15, 16, 17, 18, 19]);
    animation.onComplete.add(function(sprite, animation){
        sprite.kill();
        animation.stop();
    }, this);

    animation.play(20, false);

    skill.kill();
};