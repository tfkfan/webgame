Icebolt = function (model, name, image, damage, rate) {
    ThrownSkill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'icebolt',
                            [0], 20, false);
    this.isAnimated = false;
};
Icebolt.prototype = Object.create(ThrownSkill.prototype);
Icebolt.prototype.constructor = Icebolt;
Icebolt.prototype.onStart = function(attacker, skill, target){
    skill = ThrownSkill.prototype.onStart.call(this, attacker, skill, target);
    skill.scale.setTo(0.04);
    return skill;
};
Icebolt.prototype.onCollide = function(skill, target){
    target.isMovable = false;

    var sprite = this.game.add.sprite(target.x - target.width/3, target.y - target.height/3, 'iceboltBlast', 5);
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    var animation = sprite.animations.add('runBlast', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

    animation.onComplete.add(function(sprite, animation){
        sprite.kill();
        animation.stop();
    }, this);

    animation.play(50, false);

    skill.kill();
};