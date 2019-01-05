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