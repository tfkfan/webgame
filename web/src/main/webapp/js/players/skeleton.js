Skeleton = function (gameController, player, corpses, name) {
    Enemy.call(this, gameController, player, corpses, name);
};

Skeleton.prototype = Object.create(Enemy.prototype);
Skeleton.prototype.constructor = Skeleton;
Skeleton.prototype.create = function(x, y, img){
   var enemy = Enemy.prototype.create.call(this, x, y, img);

  enemy.animations.add('down', [9, 10, 11], 10, true);
  enemy.animations.add('left', [21, 22, 23], 10, true);
  enemy.animations.add('right', [33, 34, 35], 10, true);
  enemy.animations.add('up', [45, 46, 47], 10, true);
  return setStats(enemy, this.player, 'Skeleton', 100, 70, 20, 5, 6);
};