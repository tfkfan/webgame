class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
       super(scene, x, y, texture, frame);
       scene.add.existing(this);
       this.currentDir = "up";
       this.isMoving = false;
       this.init();
    }

    init(){
        this.scene.anims.create({ key: 'up', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageup', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_up', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageup', end: 0, zeroPad: 2 }), repeat: -1 });

        this.scene.anims.create({ key: 'upright', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageupright', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_upright', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageupright', end: 0, zeroPad: 2 }), repeat: -1 });

        this.scene.anims.create({ key: 'right', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageright', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_right', frames:
             this.scene.anims.generateFrameNames('mage', { prefix: 'mageright', end: 0, zeroPad: 2 }), repeat: -1 });

    }


}