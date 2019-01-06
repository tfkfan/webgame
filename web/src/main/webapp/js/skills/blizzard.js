Blizzard = function (model, name, image, damage, rate) {
    FallingSkill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'blizzard',
                            [0, 1, 2, 3], 10, false);
    this.frames = 20;
    this.delay = 10;
};
Blizzard.prototype = Object.create(FallingSkill.prototype);
Blizzard.prototype.constructor = Blizzard;
Blizzard.prototype.onTweenComplete = function(skill){
    skill.animations.play("blizzard");
};