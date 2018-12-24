Enemies = function (model, player, corpses, name) {
    Phaser.Group.call(this, model.game);

    this.model = model;
    this.name = name;
    this.player = player;
    this.corpses = corpses;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;
Enemies.prototype.create = function(x, y, img){
    var enemy = null;
    var rnd = Math.random();
    if (rnd >= 0 && rnd < .3)
        enemy = setStats(new Skeleton(this.game, x, y, img), this.player, 100, 70, 20, 5, 6);
    else if (rnd >= .3 && rnd < .4)
        enemy = setStats(new Slime(this.game, x, y, img), this.player, 100, 70, 20, 5, 6);
    else if (rnd >= .4 && rnd < .6)
        enemy = setStats(new Bat(this.game, x, y, img), this.player, 20, 200, 10, 2, 8);
    else if (rnd >= .6 && rnd < .7)
        enemy = setStats(new Ghost(this.game, x, y, img), this.player, 200, 60, 30, 7, 9);
    else
        enemy = setStats(new Spider(this.game, x, y, img), this.player, 50, 120, 12, 4, 10);

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

Enemies.prototype.generate = function(){
    var enemy = this.create(this.game.world.randomX, this.game.world.randomY, 'characters');
    console.log('Generated ' + enemy.name + ' with ' + enemy.health + ' health, ' + enemy.strength + ' strength, and ' + enemy.speed + ' speed.');
    return enemy;
};

Enemies.prototype.update = function(){
     this.forEachAlive(function(enemy) {
        if (enemy.visible && enemy.inCamera) {
            this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed)
            this.enemyMovementHandler(enemy);
        }
    }, this);

    this.forEachDead(function(enemy) {
        if (rng(0, 5)) {
            this.model.collectables.generateGold(enemy);
        } else if (rng(0, 2)) {
            this.model.collectables.generatePotion(enemy);
            this.notification = 'The ' + enemy.name + ' dropped a potion!';
        }
        this.player.xp += enemy.reward;
        this.generate();
        this.model.deathHandler(enemy);
    }, this);
};