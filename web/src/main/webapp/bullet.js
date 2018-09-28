class Bullet extends Skill{
   constructor(scene, x, y, texture, frame){
        super(scene, x, y, "bullet", frame);
   }

   fire(player, target){
        super.fire(player, target);
        this.setPosition(player.x, player.y);
        var absVel = 1;
        var vect = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y);
        vect.normalize();
        vect.x = absVel * vect.x;
        vect.y = absVel * vect.y;

        this.speed = vect;
   }

   update(time, delta){
       super.update(time, delta);
       this.x += this.speed.x * delta;
       this.y += this.speed.y * delta;
   }
}
