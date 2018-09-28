class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
       super(scene, x, y, texture, frame);
       scene.add.existing(this);

       //default settings
       this.currentDir = "up";
       this.isMoving = false;

       this.init();
    }

    init(){
        var key = this.texture.key;
        this.scene.anims.create({ key: 'up', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key +'up', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_up', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key + 'up', end: 0, zeroPad: 2 }), repeat: -1 });

        this.scene.anims.create({ key: 'upright', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key + 'upright', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_upright', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key + 'upright', end: 0, zeroPad: 2 }), repeat: -1 });

        this.scene.anims.create({ key: 'right', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key + 'right', end: 4, zeroPad: 2 }), repeat: -1 });
        this.scene.anims.create({ key: 'standing_right', frames:
             this.scene.anims.generateFrameNames(key, { prefix: key + 'right', end: 0, zeroPad: 2 }), repeat: -1 });

        this.scene.anims.create({ key: 'attack_up', frames:
              this.scene.anims.generateFrameNames(key, { prefix: key + 'attackup', end: 4, zeroPad: 2 }), repeat: 0});

    }

    attack(target){
        this.play("attack_" + this.currentDir);
    }

    update(time, delta){

    }

    animate(velocity){
        var directionState = this.currentDir;
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

        if(directionState != this.currentDir){
            this.play(directionState);
            this.currentDir = directionState;
        }

        if(isMoving != this.isMoving){
            if(!isMoving)
                 this.play("standing_" + directionState);
            else
               this.play(directionState);
            this.isMoving = isMoving;
        }

        this.velocity = velocity;
        this.x+=velocity.x;
        this.y+=velocity.y;
    }
}