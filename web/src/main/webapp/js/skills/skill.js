Skill = function (game, name, image, damage) {
    Phaser.Group.call(this, game);

    this.name = name;
    this.image = image;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    this.damage = damage;
    this.next = 0;
    this.name = name;

    this.createMultiple(50, this.image);

};

Skill.prototype = Object.create(Phaser.Group.prototype);
Skill.prototype.constructor = Skill;
Skill.prototype.run = function(a){

};