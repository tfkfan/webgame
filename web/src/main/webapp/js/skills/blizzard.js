Blizzard = function (model, name, image, damage, rate) {
    Skill.call(this, model, name, image, damage, rate);
    this.callAll('animations.add', 'animations', 'blizzard',
                            [0, 1, 2, 3], 10, false);
    this.frames = 20;
    this.delay = 10;
};

Blizzard.prototype = Object.create(Skill.prototype);
Blizzard.prototype.constructor = Blizzard;
Blizzard.prototype.onCustomAnimationComplete = function(skill, event){
     Skill.prototype.onCustomAnimationComplete.call(this,skill, event);
     skill.body.isFalling = true;
};
Blizzard.prototype.onStart = function(attacker, skill, target){
     var rx1 = target.x - 50;
     var ry1 = target.y - 25;
     var rx2 = target.x + 50;
     var ry2 = target.y + 25;

     var _THIS = this;

     var randX = getRandomNum(rx1, rx2);
     var randY = getRandomNum(ry1, ry2);

     if(skill.body.isFalling === undefined || skill.body.isFalling)
        skill.body.enable = false;

     skill.reset(randX - 150, randY - 250);

     var tween = _THIS.game.add.tween(skill).to( { x: randX, y: randY}, 1000);
     tween.onComplete.add(function(){
         skill.animations.play("blizzard");
         skill.body.isFalling = false;
         skill.body.enable = true;
         skill.events.onAnimationComplete.add(function(event){
             _THIS.onCustomAnimationComplete(skill, event);
         }, _THIS);
     }, _THIS);
     tween.start();

     return skill;
};