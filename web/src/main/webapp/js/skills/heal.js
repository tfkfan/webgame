Heal = function (model, name, image, damage, rate) {
    Buff.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'heal',
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                            12, 13, 14, 15, 16, 17, 18, 19], 10, false);
    this.isBuff = true;
};

Heal.prototype = Object.create(Buff.prototype);
Heal.prototype.constructor = Heal;
Heal.prototype.onAnimationStart = function(skill){
    skill.animations.play("heal");
};
Heal.prototype.onBuffAction = function(summoner){
    summoner.health += this.rate;
};