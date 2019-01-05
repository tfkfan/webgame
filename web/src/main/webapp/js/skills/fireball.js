Fireball = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superFireball',
                            [0], 10, false);
    this.isAnimated = false;
};

Fireball.prototype = Object.create(Skill.prototype);
Fireball.prototype.constructor = Fireball;
Fireball.prototype.onUpdate = function(skill){
    var tg = new Phaser.Rectangle(this.px - 10, this.py - 10, 20, 20);
    this.game.debug.geom(tg,'#008000');
};
Fireball.prototype.onStart = function(attacker, skill, target){

    this.px = target.x;
    this.py = target.y;
    skill.lifespan = 2000;

    skill.scale.setTo(0.03);
    skill.body.enable = true;
    skill.animations.play("superFireball");

    this.game.physics.arcade.moveToObject(skill, this.game.input.activePointer, 1000);
    return skill;
};