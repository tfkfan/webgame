Bosses = function (model, player,  name) {
    Phaser.Group.call(this, model.game);

    this.model = model;
    this.name = name;
    this.player = player;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.bossColorIndex = 0;
    this.bossSpawned = false;

    this.bossAttacks = this.game.add.group();
};

Bosses.prototype = Object.create(Phaser.Group.prototype);
Bosses.prototype.constructor = Bosses;
Bosses.prototype.generateDragon = function (colorIndex) {
    var boss = new Dragon(this.game, this.player.x, this.player.y - 300, colorIndex);
    this.add(boss);
    console.log('Generated dragon!');
    return setStats(boss, this.player, 2000, 100, 50, 500, 0);
};

Bosses.prototype.update = function(){
    // Spawn boss if player obtains enough gold
   if (this.model.gold > this.model.goldForBoss && !this.bossSpawned) {
       this.bossSpawned = true;
       this.model.goldForBoss += 1000;

       var boss = this.generateDragon(this.bossColorIndex);

       this.model.dragonSound.play();
       this.model.notification = 'A ' + boss.name + ' appeared!';
   }
   this.forEachAlive(function(boss) {
       if (boss.visible && boss.inCamera) {
           this.game.physics.arcade.moveToObject(boss, this.player, boss.speed)
           //this.enemyMovementHandler(boss);
           this.model.attack(boss, this.bossAttacks);
       }
   }, this);
   this.forEachDead(function(boss) {
       this.bossSpawned = false;
       if (this.bossColorIndex === 7)
            this.bossColorIndex = 0;
       else
           this.bossColorIndex++;

       // Make the dragon explode
       var emitter = this.game.add.emitter(boss.x, boss.y, 100);
       emitter.makeParticles('flame');
       emitter.minParticleSpeed.setTo(-200, -200);
       emitter.maxParticleSpeed.setTo(200, 200);
       emitter.gravity = 0;
       emitter.start(true, 1000, null, 100);

       this.model.bossDeathHandler(boss);
       boss.destroy();
   }, this);
};