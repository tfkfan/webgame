class MainScene extends Phaser.Scene{

    constructor(){
        super({key:"MainScene"});
    }

    preload(){
        this.load.image('star', 'assets/demoscene/star2.png');
        this.load.image('bigStar', 'assets/demoscene/star3.png');
        this.load.image('ship', 'assets/sprites/shmup-ship2.png');
        this.load.image('bullet', 'assets/bullets/bullet237.png');
        this.load.image('jets', 'assets/particles/blue.png');
        this.load.image('flares', 'assets/particles/yellow.png');
        this.load.spritesheet('face', 'assets/sprites/metalface78x92.png', { frameWidth: 78, frameHeight: 92 });
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

           this.player = this.impact.add.sprite(1600, 200, 'ship').setDepth(1);
           this.player.setMaxVelocity(1000).setFriction(800, 600).setPassiveCollision();
           this.cursors = this.input.keyboard.createCursorKeys();
           this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);
    }

    update(time, delta) {
        var acc = 500;
        if (this.cursors.left.isDown)
            this.player.setVelocityX(-acc);
        else if (this.cursors.right.isDown)
            this.player.setVelocityX(acc);
        else
            this.player.setVelocityX(0);

        if (this.cursors.up.isDown)
            this.player.setVelocityY(-acc);
        else if (this.cursors.down.isDown)
            this.player.setVelocityY(acc);
        else
            this.player.setVelocityY(0);


        if (this.cursors.space.isDown && time > this.lastFired){
            var bullet = this.bullets.get();
            bullet.setActive(true);
            bullet.setVisible(true);

            if (bullet){
                bullet.fire(this.player);
                this.lastFired = time + 100;
            }
        }

        //  Emitters to bullets
        this.bullets.children.each(function(b) {
           /* if (b.active){
                this.flares.setPosition(b.x, b.y);
                this.flares.setSpeed(b.speed + 500 * -1);
                this.flares.emitParticle(1);
            }*/
        }, this);

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