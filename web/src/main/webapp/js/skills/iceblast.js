Iceblast = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'superIceblast',
                [0, 1, 2, 3, 4, 5, 6, 7, 8], 20, false);
};

Iceblast.prototype = Object.create(Skill.prototype);
Iceblast.prototype.constructor = Iceblast;
Iceblast.prototype.onStart = function(attacker, skill, target){
    skill.scale.setTo(1);
    skill.body.enable = true;
    skill.height = skill.width;
    skill.x = target.x - skill.width/2;
    skill.y = target.y - skill.height/2;
    skill.body.immovable = true;
    skill.body.moves = false;
    skill.animations.play("superIceblast");

    return skill;
};