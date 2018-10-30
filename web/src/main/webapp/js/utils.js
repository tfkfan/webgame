function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function setStats(entity, player, name, health, speed, strength, reward, corpseSprite) {
    entity.animations.play('down');
    entity.scale.setTo(2);
    entity.body.collideWorldBounds = true;
    entity.body.velocity.x = 0,
    entity.body.velocity.y = 0,
    entity.alive = true;
    entity.name = name;
    entity.level = player.level;
    entity.health = health + (entity.level * 2);
    entity.speed = speed + Math.floor(entity.level * 1.5);;
    entity.strength = strength + Math.floor(entity.level * 1.5);;
    entity.reward = reward + Math.floor(entity.level * 1.5);
    entity.invincibilityFrames = 300;
    entity.invincibilityTime = 0;
    entity.corpseSprite = corpseSprite;
    return entity;
}

 deathHandler = function (target, corpses) {
    var corpse = corpses.create(target.x, target.y, 'dead')
    corpse.scale.setTo(2);
    corpse.animations.add('idle', [target.corpseSprite], 0, true);
    corpse.animations.play('idle');
    corpse.lifespan = 3000;
    target.destroy();
}