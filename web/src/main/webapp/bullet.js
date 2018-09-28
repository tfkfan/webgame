class Bullet extends Phaser.GameObjects.Sprite{
   constructor(scene, x, y, texture, frame){
       super(scene, 0, 0, "bullet", frame);
       this.speed = 0;
       this.born = 0;
   }

   fire(player, target){
       this.setPosition(player.x, player.y);
       var absVel = 1;
       var vect = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y);
       vect.normalize();
       vect.x = absVel * vect.x;
       vect.y = absVel * vect.y;

       this.speed = vect;
       this.target = target;
       this.born = 0;
   }

   update(time, delta){
       this.x += this.speed.x * delta;
       this.y += this.speed.y * delta;

       this.born += delta;
       if (this.born > 1000 || this.target.distance(new Phaser.Math.Vector2(this.x, this.y)) <=20){
           this.setActive(false);
           this.setVisible(false);
       }
   }
}
