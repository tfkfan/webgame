Player = function (model, x,y, spritename, name) {
   Phaser.Sprite.call(this, model.game, x, y, spritename);
   this.model = model;
   this.scale.setTo(2);
   this.game.physics.arcade.enable(this);
   this.direction = 'up';
   this.body.collideWorldBounds = true
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

   var style = { font: '14px Arial', fill: '#fff', align: 'center' };
   this.nameLabel = this.game.add.text(this.x, this.y - 75, this.name, style);

   style = { font: '10px Arial', fill: '#fff', align: 'center' };
   this.spellLabel = this.game.add.text(230, this.game.height - 25, text, style);
   this.spellLabel.fixedToCamera = true;

   this.hpLine = new Phaser.Rectangle(this.x, this.y - 75, this.width, 5);
   this.emptyHpLine = new Phaser.Rectangle(this.x, this.y - 75, this.width, 5);

   this.playerAttacks = new Blizzard(this, 'blizzard', 'skills', 1000);

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
    
Player.prototype.update = function(){
    Phaser.Sprite.prototype.update.call(this);
    this.nameLabel.x = this.x + this.width/3;
    this.nameLabel.y = this.y - 5;

    this.hpLine.x = this.x;
    this.hpLine.y = this.y + 20;
    this.emptyHpLine.x = this.x;
    this.emptyHpLine.y = this.y + 20;

    this.hpLine.width = this.width*(this.health/this.maxHealth);
    this.emptyHpLine.width = this.width;

    this.game.debug.geom(this.emptyHpLine,'#ff0000');
    this.game.debug.geom(this.hpLine,'#008000');
    
    if (this.alive) {
        this.playerMovementHandler();
        if (this.game.input.activePointer.isDown) {
            this.playerAttacks.rate = 1000;
            this.playerAttacks.range = this.strength * 3;
            this.isAttack = true;
            this.model.attack(this, this.playerAttacks);
        }

        if (this.game.time.now > this.spellCooldown) {
            this.spellLabel.text = "READY!";
            if (this.controls.spell.isDown) {
                this.playerSpells.rate = 5000;
                this.playerSpells.range = this.strength * 6;
                this.isAttack = true;
                this.spellCooldown = this.game.time.now + 15000;
                this.model.attack(this, this.playerSpells);
            }
        } else {
            this.spellLabel.text = "RECHARGING...";
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
