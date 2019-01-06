FallingSkill = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.frames = 30;
    this.delay = 10;
};

FallingSkill.prototype = Object.create(Skill.prototype);
FallingSkill.prototype.constructor = FallingSkill;
FallingSkill.prototype.onCustomAnimationComplete = function(skill, event){
     Skill.prototype.onCustomAnimationComplete.call(this,skill, event);
     skill.body.isFalling = true;
};
FallingSkill.prototype.onTweenComplete = function(skill){
};
FallingSkill.prototype.onStart = function(attacker, skill, target){
     var rx1 = target.x - 75;
     var ry1 = target.y - 50;
     var rx2 = target.x + 75;
     var ry2 = target.y + 50;

     var _THIS = this;

     var randX = getRandomNum(rx1, rx2);
     var randY = getRandomNum(ry1, ry2);

     if(skill.body.isFalling === undefined || skill.body.isFalling)
        skill.body.enable = false;

     skill.reset(randX - 150, randY - 250);

     var tween = _THIS.game.add.tween(skill).to( { x: randX, y: randY}, 1000);
     tween.onComplete.add(function(){
         skill.body.isFalling = false;
         skill.body.enable = true;
         skill.events.onAnimationComplete.add(function(event){
             _THIS.onCustomAnimationComplete(skill, event);
         }, _THIS);
         _THIS.onTweenComplete(skill);
     }, _THIS);
     tween.start();

     return skill;
};