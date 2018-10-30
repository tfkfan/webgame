Mage = function (gameController, x,y, spritename, name) {
   Player.call(this, gameController, x, y, spritename, name);
};

Mage.prototype = Object.create(Player.prototype);
Mage.prototype.constructor = Mage;
Mage.prototype.initAnimations = function(){
    this.animations.add('up',[0,1,2,3,4], 10, true);
    this.animations.add('upright',[5,6,7,8,9], 10, true);
    this.animations.add('right',[10,11,12,13,14], 10, true);
    this.animations.add('downright',[15,16,17,18,19], 10, true);
    this.animations.add('down',[20,21,22,23,24], 10, true);
    this.animations.add('downleft',[25,26,27,28,29], 10, true);
    this.animations.add('left',[30,31,32,33,34], 10, true);
    this.animations.add('upleft',[35,36,37,38,39], 10, true);

    this.animations.add('upattack',[40,41,42,43], 10, false);
    this.animations.add('uprightattack',[44,45,46,47], 10, false);
    this.animations.add('rightattack',[48,49,50,51], 10, false);
    this.animations.add('downrightattack',[52,53,54,55], 10, false);
    this.animations.add('downattack',[56,57,58,59], 10, false);
    this.animations.add('downleftattack',[56,57,58,59], 10, false);
    this.animations.add('leftattack',[56,57,58,59], 10, false);
    this.animations.add('upleftattack',[56,57,58,59], 10, false);

    var onComplete = function () {
         this.isAttack = false;
         this.play(this.direction);
    }

    this.animations._anims.upattack.onComplete.add(onComplete, this);
    this.animations._anims.uprightattack.onComplete.add(onComplete, this);
    this.animations._anims.rightattack.onComplete.add(onComplete, this);
    this.animations._anims.downrightattack.onComplete.add(onComplete, this);
    this.animations._anims.downattack.onComplete.add(onComplete, this);
    this.animations._anims.downleftattack.onComplete.add(onComplete, this);
    this.animations._anims.leftattack.onComplete.add(onComplete, this);
    this.animations._anims.upleftattack.onComplete.add(onComplete, this);
};
