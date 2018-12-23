Collectables = function (gameController, player, name) {
    Phaser.Group.call(this, gameController.game);

    this.gameController = gameController;
    this.name = name;
    this.player = player;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
};

Collectables.prototype = Object.create(Phaser.Group.prototype);
Collectables.prototype.constructor = Collectables;
Collectables.prototype.generateChests = function(amount){
     for (var i = 0; i < amount; i++) {
          var point = this.gameController.getRandomLocation();
          var collectable = this.generateChest(point);
     }
};

Collectables.prototype.generateGold = function(enemy){
    var collectable = new Gold(this.game, enemy.x, enemy.y, enemy.reward*2);
    this.add(collectable);
    return collectable;
};

Collectables.prototype.generateChest = function (location) {
    var collectable = new Chest(this.game,location.x, location.y);
    this.add(collectable);
    return collectable;
};

Collectables.prototype.generatePotion = function (location) {
    var rnd = Math.random();
    if (rnd >= 0 && rnd < .7)
        this.generateHealthPotion(location);
    else if (rnd >= .7 && rnd < .8)
        this.generateVitalityPotion(location);
    else if (rnd >= .8 && rnd < .9)
        this.generateStrengthPotion(location);
    else if (rnd >= .9 && rnd < 1)
        this.generateSpeedPotion(location);
};

Collectables.prototype.generateHealthPotion = function (location) {
    var collectable = new HealthPotion(this.game, location.x, location.y, 20 + Math.floor(Math.random() * 10) + this.player.level);
    this.add(collectable);
    return collectable;
};

Collectables.prototype.generateVitalityPotion = function (location) {
    var collectable = new VitalityPotion(this.game, location.x, location.y, 4 + Math.floor(Math.random() * 10));
    this.add(collectable);
    return collectable;
};

Collectables.prototype.generateStrengthPotion = function (location) {
   var collectable = new StrengthPotion(this.game, location.x, location.y, 1 + Math.floor(Math.random() * 10));
  this.add(collectable);
   return collectable;
};

Collectables.prototype.generateSpeedPotion = function (location) {
    var collectable = new SpeedPotion(this.game, location.x, location.y,  1 + Math.floor(Math.random() * 10));
     this.add(collectable);
    return collectable;
};