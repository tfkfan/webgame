class Skill extends Phaser.GameObjects.Sprite{
   constructor(scene, x, y, texture, frame){
       super(scene, x, y, texture, frame);
       this.speed = 0;
       this.born = 0;
       this.active = true;
       this.visible = true;
   }

   fire(player, target){
       this.player = player;
       this.target = target;
       this.born = 0;

       player.attack(target);
   }

   update(time, delta){
       this.born += delta;
       if (this.born > 1000 || this.target.distance(new Phaser.Math.Vector2(this.x, this.y)) <=20){
           this.setActive(false);
           this.setVisible(false);
       }
   }
}
