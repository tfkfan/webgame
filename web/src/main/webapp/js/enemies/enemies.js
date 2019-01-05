Enemies = function (model, player, name) {
    Phaser.Group.call(this, model.game);

    this.model = model;
    this.name = name;
    this.player = player;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;
Enemies.prototype.create = function(x, y, img){
    var enemy = null;
    var rnd = Math.random();
    var level = 5;
    if (rnd >= 0 && rnd < .3)
        enemy = setStats(new Skeleton(this.game, x, y, img), level, 100, 70, 20, 5, 6);
    else if (rnd >= .3 && rnd < .4)
        enemy = setStats(new Slime(this.game, x, y, img), level, 100, 70, 20, 5, 6);
    else if (rnd >= .4 && rnd < .6)
        enemy = setStats(new Bat(this.game, x, y, img), level, 20, 200, 10, 2, 8);
    else if (rnd >= .6 && rnd < .7)
        enemy = setStats(new Ghost(this.game, x, y, img), level, 200, 60, 30, 7, 9);
    else
        enemy = setStats(new Spider(this.game, x, y, img), level, 50, 120, 12, 4, 10);

    this.add(enemy);
    return enemy;
};
Enemies.prototype.enemyMovementHandler = function (enemy) {
    if (enemy.body.velocity.x < 0 && enemy.body.velocity.x <= -Math.abs(enemy.body.velocity.y))
        enemy.animations.play('left');
    else if (enemy.body.velocity.x > 0 && enemy.body.velocity.x >= Math.abs(enemy.body.velocity.y))
        enemy.animations.play('right');
    else if (enemy.body.velocity.y < 0 && enemy.body.velocity.y <= -Math.abs(enemy.body.velocity.x))
        enemy.animations.play('up');
    else
        enemy.animations.play('down');
};

Enemies.prototype.generateOne = function(){
    var enemy = this.create(this.game.world.randomX, this.game.world.randomY, 'characters');
    console.log('Generated ' + enemy.name + ' with ' + enemy.health + ' health, ' + enemy.strength + ' strength, and ' + enemy.speed + ' speed.');
    return enemy;
};

Enemies.prototype.generate = function(amount){
    for (var i = 0; i < amount; i++)
        this.generateOne();
};

Enemies.prototype.onAliveEnemyUpdate = function(enemy){
    this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed)
    this.enemyMovementHandler(enemy);
};
Enemies.prototype.onEnemyDeath = function(enemy){
   this.model.enemyDeathHandler(enemy);
};
Enemies.prototype.onEnemyUpdate = function(){
};

Enemies.prototype.update = function(){
    Phaser.Group.prototype.update.call(this);
    var _THIS = this;
    this.onEnemyUpdate();
    this.forEachAlive(function(enemy) {
        if (enemy.visible && enemy.inCamera) {
            _THIS.onAliveEnemyUpdate(enemy);
        }
    }, this);

    this.forEachDead(function(enemy) {
       _THIS.onEnemyDeath(enemy);
    }, this);
};