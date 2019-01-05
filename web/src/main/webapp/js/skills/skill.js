Skill = function (model, name, image, damage, rate) {
    Phaser.Group.call(this, model.game);

    this.model = model;
    this.name = name;
    this.image = image;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    this.damage = damage;
    this.rate = rate;
    this.next = 0;
    this.isBuff = false;
    this.isStatic = false;
    this.isAnimated = true;
    this.spellCooldown = 0;

    this.createMultiple(20, this.image);
    this.frames = 1;
    this.delay = 0;

    this.lifespan = 3000;
};

Skill.prototype = Object.create(Phaser.Group.prototype);
Skill.prototype.constructor = Skill;
Skill.prototype.start = function(counter, limit, delay, callback){
   var _THIS = this;
   if(counter < limit){
       setTimeout(function(){
           counter++;
           callback();
           _THIS.start(counter, limit, delay, callback);
       }, delay);
   }
};
Skill.prototype.onStart = function(attacker, skill){
    return skill;
};
Skill.prototype.onUpdate = function(skill){
};
Skill.prototype.onCustomAnimationComplete = function(skill, event){
    event.kill();
    skill.animations.stop(null, true);
};
Skill.prototype.update = function(){
    Phaser.Group.prototype.update.call(this);
    var _THIS = this;
    this.forEachAlive(function(skill) {
       _THIS.game.debug.spriteBounds(skill);
       _THIS.onUpdate(skill);
    }, this);
};
Skill.prototype.run = function(attacker){
    var _THIS = this;
    var p = this.game.input.activePointer;
    var target = {x : p.worldX, y : p.worldY};
    this.start(0, this.frames, this.delay, function(){
        var skill = _THIS.getFirstDead();

        skill.lifespan = _THIS.lifespan;
        skill.name = _THIS.name;
        skill.strength = _THIS.damage;
        skill.reset(attacker.x, attacker.y);
        if(_THIS.isAnimated){
            skill.events.onAnimationComplete.add(function(event){
                _THIS.onCustomAnimationComplete(skill, event);
             }, _THIS);
        }
        _THIS.onStart(attacker, skill, target);
    });
};