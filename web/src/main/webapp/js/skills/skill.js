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
    this.spellCooldown = 0;

    this.createMultiple(20, this.image);
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
Skill.prototype.update = function(){
    Phaser.Group.prototype.update.call(this);
    this.forEachAlive(function(skill) {
       this.game.debug.spriteBounds(skill);
    }, this);
};
Skill.prototype.run = function(attacker){
   var a = this.getFirstDead();

   // a.scale.setTo(1.5);
    a.name = this.name;
    a.strength = this.damage;
    a.reset(attacker.x, attacker.y);

    return a;
   // a.lifespan = 10*attacks.rate;
};