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
        var _THIS = this;
        this.lastFired=0;

        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.createStarfield();

        this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });

        this.player = new Player(this, 1600, 200, 'mage');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);

        this.game.canvas.addEventListener('mousedown', function () {
            var bullet = _THIS.bullets.get();
            bullet.setActive(true);
            bullet.setVisible(true);

            var globalPosition = game.input.activePointer;
            if (bullet)
                bullet.fire(_THIS.player, new Phaser.Math.Vector2(globalPosition.worldX,globalPosition.worldY));
        });

       this.player.play('standing_up');
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

        this.player.animate(vel);

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