Bosses = function (model, player, corpses, name) {
    Phaser.Group.call(this, model.game);

    this.model = model;
    this.name = name;
    this.player = player;
    this.corpses = corpses;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.bossColorIndex = 0;
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
   if (this.model.gold > this.model.goldForBoss && !this.model.bossSpawned) {
       this.model.bossSpawned = true;
       this.model.goldForBoss += 1000;
       var boss = this.generateDragon(this.bossColorIndex);
       this.model.dragonSound.play();
       this.model.notification = 'A ' + boss.name + ' appeared!';
   }
   this.forEachAlive(function(boss) {
       if (boss.visible && boss.inCamera) {
           this.game.physics.arcade.moveToObject(boss, this.player, boss.speed)
           //this.enemyMovementHandler(boss);
           this.model.attack(boss, this.model.bossAttacks);
       }
   }, this);
   this.forEachDead(function(boss) {
       this.model.bossSpawned = false;
       if (this.bossColorIndex === 7)
            this.bossColorIndex = 0;
       else
           this.bossColorIndex++;

       this.model.collectables.generateGold(boss);
       this.model.collectables.generateChest(boss);

       this.model.collectables.generateVitalityPotion(boss);
       this.model.collectables.generateStrengthPotion(boss);
       this.model.collectables.generateSpeedPotion(boss);
       this.model.notification = 'The ' + boss.name + ' dropped a potion!';
       this.player.xp += boss.reward;
       // Make the dragon explode
       var emitter = this.game.add.emitter(boss.x, boss.y, 100);
       emitter.makeParticles('flame');
       emitter.minParticleSpeed.setTo(-200, -200);
       emitter.maxParticleSpeed.setTo(200, 200);
       emitter.gravity = 0;
       emitter.start(true, 1000, null, 100);

       boss.destroy();
   }, this);
};