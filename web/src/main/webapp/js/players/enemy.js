Enemy = function (gameController, player, corpses, name) {
    Phaser.Group.call(this, gameController.game);

    this.gameController = gameController;
    this.name = name;
    this.player = player;
    this.corpses = corpses;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
};

Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.create = function(x, y, img){
    return Phaser.Group.prototype.create.call(this, x,y,img);
};
Enemy.prototype.enemyMovementHandler = function (enemy) {
    if (enemy.body.velocity.x < 0 && enemy.body.velocity.x <= -Math.abs(enemy.body.velocity.y))
         enemy.animations.play('left');
    else if (enemy.body.velocity.x > 0 && enemy.body.velocity.x >= Math.abs(enemy.body.velocity.y))
         enemy.animations.play('right');
     else if (enemy.body.velocity.y < 0 && enemy.body.velocity.y <= -Math.abs(enemy.body.velocity.x))
        enemy.animations.play('up');
    else
        enemy.animations.play('down');
};
Enemy.prototype.generate = function(){
    var enemy = this.create(this.game.world.randomX, this.game.world.randomY, 'characters');
    console.log('Generated ' + enemy.name + ' with ' + enemy.health + ' health, ' + enemy.strength + ' strength, and ' + enemy.speed + ' speed.');
};
Enemy.prototype.update = function(){
     this.forEachAlive(function(enemy) {
        if (enemy.visible && enemy.inCamera) {
            this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed)
            this.enemyMovementHandler(enemy);
        }
    }, this);

    this.forEachDead(function(enemy) {
        if (rng(0, 5)) {
            this.gameController.generateGold(enemy);
        } else if (rng(0, 2)) {
            this.gameController.generatePotion(enemy);
            this.notification = 'The ' + enemy.name + ' dropped a potion!';
        }
        this.player.xp += enemy.reward;
        this.generate();
        this.gameController.deathHandler(enemy);
    }, this);
};