class MainScene extends Phaser.Scene{

    constructor(){
        super({key:"MainScene"});
    }

    preload(){
        this.load.image('star', 'assets/demoscene/star2.png');
        this.load.image('bigStar', 'assets/demoscene/star3.png');
        this.load.image('bullet', 'assets/demoscene/bullet237.png');
        this.load.atlas('mage', 'assets/playersheets/mage.png', 'assets/playersheets/mage_atlas.json');
    }

    create(){
        var Bullet = new Phaser.Class({
               Extends: Phaser.GameObjects.Image,

               initialize:
               function Bullet (scene) {
                   Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                   this.speed = 0;
                   this.born = 0;
               },

               fire: function (player){
                   this.setPosition(player.x, player.y);
                   if (player.flipX)
                       this.speed = Phaser.Math.GetSpeed(-1000 + player.vel.x, 1);
                   else
                       this.speed = Phaser.Math.GetSpeed(1000 + player.vel.x, 1);
                   this.born = 0;
               },

               update: function (time, delta){
                   this.x += this.speed * delta;
                   this.born += delta;
                   if (this.born > 1000){
                       this.setActive(false);
                       this.setVisible(false);
                   }
               }
           });

            this.lastFired=0;

           this.cameras.main.setBounds(0, 0, 3200, 3200);
           this.createStarfield();

           this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });

           this.player = this.add.sprite(1600, 200, 'mage');
           this.cursors = this.input.keyboard.createCursorKeys();
           this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);

           this.anims.create({ key: 'up', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageup', end: 4, zeroPad: 2 }), repeat: -1 });
           this.anims.create({ key: 'standing_up', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageup', end: 0, zeroPad: 2 }), repeat: -1 });

           this.anims.create({ key: 'upright', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageupright', end: 4, zeroPad: 2 }), repeat: -1 });
           this.anims.create({ key: 'standing_upright', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageupright', end: 0, zeroPad: 2 }), repeat: -1 });

           this.anims.create({ key: 'right', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageright', end: 4, zeroPad: 2 }), repeat: -1 });
           this.anims.create({ key: 'standing_right', frames:
                this.anims.generateFrameNames('mage', { prefix: 'mageright', end: 0, zeroPad: 2 }), repeat: -1 });


           this.player.properties = {
             currentDir: "up",
             isMoving: false
           };

           this.player.play('standing_up');
    }

    updatePlayer(velocity){
        var directionState = this.player.properties.currentDir;
        var isMoving = true;

        if (velocity.x > 0 && velocity.y < 0)
            directionState = "upright";
        else if (velocity.x > 0 && velocity.y > 0)
            directionState = "rightdown";
        else if (velocity.x < 0 && velocity.y < 0)
            directionState = "upleft";
        else if (velocity.x < 0 && velocity.y > 0)
            directionState = "leftdown";
        else  if(velocity.y == 0 && velocity.x > 0)
            directionState = "right";
        else if(velocity.y == 0 && velocity.x < 0)
            directionState = "left";
        else if(velocity.x == 0 && velocity.y < 0)
            directionState = "up";
        else if(velocity.x == 0 && velocity.y > 0)
            directionState = "down";
        else{
            //standing
            isMoving = false;
        }

        if(directionState != this.player.properties.currentDir){
            this.player.play(directionState);
            this.player.properties.currentDir = directionState;
        }


        if(isMoving != this.player.properties.isMoving){
            if(!isMoving)
                 this.player.play("standing_" + directionState);
            else
               this.player.play(directionState);
            this.player.properties.isMoving = isMoving;
        }

        this.player.x+=velocity.x;
        this.player.y+=velocity.y;
    }

    update(time, delta) {
        var acc = 10;
        var vel = {x:0, y:0};

        if (this.cursors.left.isDown)
            vel.x = -acc;
        else if (this.cursors.right.isDown)
            vel.x = acc;

        if (this.cursors.up.isDown)
            vel.y = -acc;
        else if (this.cursors.down.isDown)
            vel.y = acc;

        if(vel.x != 0 && vel.y != 0){
            console.log("ok")
        }

        this.updatePlayer(vel);

        if (this.cursors.space.isDown && time > this.lastFired){
            var bullet = this.bullets.get();
            bullet.setActive(true);
            bullet.setVisible(true);

            if (bullet){
                bullet.fire(this.player);
                this.lastFired = time + 100;
            }
        }

        this.text.setText(this.player.x + "/" + this.player.y);

        this.cameras.main.scrollX = this.player.x - 400;
        this.cameras.main.scrollY = this.player.y - 300;
    }

    createStarfield (){
        var group = this.add.group({ key: 'star', frameQuantity: 256 });

        group.createMultiple({ key: 'bigStar', frameQuantity: 32 });

        var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 3200);

        Phaser.Actions.RandomRectangle(group.getChildren(), rect);

        group.children.iterate(function (child, index) {

            var sf = Math.max(0.3, Math.random());

            if (child.texture.key === 'bigStar')
                sf = 0.2;

            child.setScrollFactor(sf);

            // this.minimap.ignore(child);

        }, this);
    }
};