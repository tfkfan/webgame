Player = function (model, x,y, spritename, name) {
   Phaser.Sprite.call(this, model.game, x, y, spritename);
   this.model = model;
   this.scale.setTo(2);
   this.game.physics.arcade.enable(this);
   this.direction = 'up';
   this.body.collideWorldBounds = true;
   this.alive = true;
   this.name = name;
   this.level = 1;
   this.health = 100;
   this.maxHealth = 100;
   this.strength = 85;
   this.speed = 125;
   this.invincibilityFrames = 500;
   this.invincibilityTime = 0;
   this.corpseSprite = 1;
   this.spellCooldown = 0;
   this.xp = 0;
   this.xpToNext = 20;

   this.initAnimations();
   this.animations.play(this.direction);

   this.skills = [
      new Blizzard(this.model, 'blizzard', 'skills', 1000, 1000),
      new Fireball(this.model, 'fireball','fireball', 500, 500),
      new Iceblast(this.model, 'iceblast','iceblast',50, 1000),
      new Buff(this.model, 'heal','staticSpell', 100, 500)
   ];
   this.playerAttacks = this.skills[0];

   this.skillControls = this.game.input.keyboard.addKeys({
        0:Phaser.Keyboard.ONE,
        1:Phaser.Keyboard.TWO,
        2:Phaser.Keyboard.THREE,
        3:Phaser.Keyboard.FOUR,
        4:Phaser.Keyboard.FIVE,
        5:Phaser.Keyboard.SIX,
        6:Phaser.Keyboard.SEVEN,
        7:Phaser.Keyboard.EIGHT,
        8:Phaser.Keyboard.NINE,
        9:Phaser.Keyboard.ZERO
   });

   for(var number in this.skillControls) {
        this.skillControls[number].onDown.add(this.onSkillSelected, this);
   }

   this.controls = {
       up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
       left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
       down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
       right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
       spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
   };
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.onSkillSelected = function(key){
    var index = key.keyCode - 49;
    if(index >= 0 && index <= 9 && index < this.skills.length){
        this.playerAttacks = this.skills[index];
    }
};

Player.prototype.playerMovementHandler = function () {
    var vel = {x:0, y:0};
    // Up-Left
    if (this.controls.up.isDown && this.controls.left.isDown) {
        vel.x = -this.speed;
        vel.y = -this.speed;
        this.direction = 'upleft';
        if(!this.isAttack)
            this.animations.play(this.direction);
        else
            this.animations.play(this.direction + "attack");
    // Up-Right
    } else if (this.controls.up.isDown && this.controls.right.isDown) {
        vel.x = this.speed;
        vel.y = -this.speed;
        this.direction = 'upright';
        if(!this.isAttack)
            this.animations.play(this.direction);
        else
            this.animations.play(this.direction + "attack");
    // Down-Left
    } else if (this.controls.down.isDown && this.controls.left.isDown) {
        vel.x = -this.speed;
        vel.y = this.speed;
        this.direction = 'downleft';
        if(!this.isAttack)
            this.animations.play(this.direction);
        else
            this.animations.play(this.direction + "attack");
    // Down-Right
    } else if (this.controls.down.isDown && this.controls.right.isDown) {
        vel.x = this.speed;
        vel.y = this.speed;
        this.direction = 'downright';
        if(!this.isAttack)
           this.animations.play(this.direction);
        else
           this.animations.play(this.direction + "attack");
    // Up
    } else if (this.controls.up.isDown) {
        vel.x = 0;
        vel.y = -this.speed;
        this.direction = 'up';
        if(!this.isAttack)
             this.animations.play(this.direction);
         else
             this.animations.play(this.direction + "attack");
    // Down
    } else if (this.controls.down.isDown) {
        vel.x = 0;
        vel.y = this.speed;
        this.direction = 'down';
        if(!this.isAttack)
           this.animations.play(this.direction);
        else
           this.animations.play(this.direction + "attack");
    // Left
    } else if (this.controls.left.isDown) {
        vel.x = -this.speed;
        vel.y = 0;
        this.direction = 'left';
         if(!this.isAttack)
            this.animations.play(this.direction);
         else
            this.animations.play(this.direction + "attack");
    // Right
    } else if (this.controls.right.isDown) {
        vel.x = this.speed;
        vel.y = 0;
        this.direction = 'right';
         if(!this.isAttack)
            this.animations.play(this.direction);
         else
            this.animations.play(this.direction + "attack");
    // Still
    } else {

        if(this.isAttack)
            this.animations.play(this.direction + "attack");
        else
            this.animations.stop();
        vel.x = 0;
        vel.y = 0;
    }

    this.body.velocity.x = vel.x;
    this.body.velocity.y = vel.y;
};
Player.prototype.isReady = function(){
    return this.game.time.now > this.playerAttacks.spellCooldown;
};
Player.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);

    if (this.alive) {
        this.playerMovementHandler();

        if (this.isReady() && this.game.input.activePointer.isDown) {
            this.isAttack = true;
            this.playerAttacks.spellCooldown = this.game.time.now + this.playerAttacks.rate;

            var p = this.game.input.activePointer;
            var target = {x : p.worldX, y : p.worldY};
            this.model.attack(this, this.playerAttacks, target);
        }

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        if (this.xp >= this.xpToNext)
            this.levelUp();
    }else{
        this.model.deathHandler(this);
        this.model.time.events.add(1000, this.model.gameOver, this.model);
    }
};

Player.prototype.levelUp = function() {
    this.level++;
    this.maxHealth += 5;
    this.health += 5;
    this.strength += 1;
    this.speed += 1;
    this.xp -= this.xpToNext;
    this.xpToNext = Math.floor(this.xpToNext * 1.1);

    this.model.levelUpHandler();

    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('levelParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
};

Player.prototype.initAnimations = function(){
};
