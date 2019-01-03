Skill = function (model, name, image, rate) {
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

    this.rate = rate;
    this.next = 0;
    this.isBuff = false;

    this.createMultiple(20, this.image);
};

Skill.prototype = Object.create(Phaser.Group.prototype);
Skill.prototype.constructor = Skill;
Skill.prototype.update = function(){
    Phaser.Group.prototype.update.call(this);
};
Skill.prototype.run = function(a){
};