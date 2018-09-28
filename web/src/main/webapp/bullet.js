class Bullet extends Phaser.GameObjects.Image{
   constructor(scene, x, y, texture, frame){
       super(scene, x, y, texture, frame);
       Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
       this.speed = 0;
       this.born = 0;
   }
   
   fire(player){
       this.setPosition(player.x, player.y);
       if (player.flipX)
           this.speed = Phaser.Math.GetSpeed(-1000 + player.velocity.x, 1);
       else
           this.speed = Phaser.Math.GetSpeed(1000 + player.velocity.x, 1);
       this.born = 0;
   }

   update(time, delta){
       this.x += this.speed * delta;
       this.born += delta;
       if (this.born > 1000){
           this.setActive(false);
           this.setVisible(false);
       }
   }
}
