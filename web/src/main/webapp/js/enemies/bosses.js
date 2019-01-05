Bosses = function (model, player,  name) {
    Enemies.call(this, model, player, name);

    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.bossColorIndex = 0;
    this.bossSpawned = false;

    this.bossAttacks = this.game.add.group();

    this.bossAttacks.damage = 30;
    this.bossAttacks.rate = 1000;
    this.bossAttacks.spellCooldown = 0;
};

Bosses.prototype = Object.create(Enemies.prototype);
Bosses.prototype.constructor = Bosses;
Bosses.prototype.generateDragon = function (colorIndex) {
    var boss = new Dragon(this.game, this.player.x, this.player.y - 300, colorIndex);
    console.log('Generated dragon!');
    this.add(boss);
    return setStats(boss, this.player.level, 2000, 100, 50, 500, 0);
};

Bosses.prototype.onAliveEnemyUpdate = function(enemy){
    Enemies.prototype.onAliveEnemyUpdate.call(this, enemy);
    if (this.game.time.now > this.bossAttacks.spellCooldown) {
       /*this.bossAttacks.createMultiple(20, 'dragonFireball');
       this.model.attack(enemy, this.bossAttacks);
       this.bossAttacks.spellCooldown = this.game.time.now + this.bossAttacks.rate;


       this.bossAttacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3], 10, true);
       this.bossAttacks.callAll('animations.play', 'animations', 'particle');
       this.bossAttacks.callAll('scale.setTo', 'scale', 0.03);*/
    }
};

Bosses.prototype.onEnemyDeath = function(enemy){
   this.bossSpawned = false;
   if (this.bossColorIndex === 7)
       this.bossColorIndex = 0;
   else
      this.bossColorIndex++;

    // Make the dragon explode
   var emitter = this.game.add.emitter(enemy.x, enemy.y, 100);
   emitter.makeParticles('flame');
   emitter.minParticleSpeed.setTo(-200, -200);
   emitter.maxParticleSpeed.setTo(200, 200);
   emitter.gravity = 0;
   emitter.start(true, 1000, null, 100);

   this.model.bossDeathHandler(enemy);
   enemy.destroy();
};

Bosses.prototype.onEnemyUpdate = function(){
   if (this.model.gold > this.model.goldForBoss && !this.bossSpawned) {
       this.bossSpawned = true;
       this.model.goldForBoss += 1000;

       var boss = this.generateDragon(this.bossColorIndex);

       this.model.dragonSound.play();
       this.model.notification = 'A ' + boss.name + ' appeared!';
   }
};