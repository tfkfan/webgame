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


function rng(floor, ceiling) {
    floor /= 10;
    ceiling /= 10;
    var rnd = Math.random();
    if (rnd >= floor && rnd < ceiling) {
        return true;
    }
    return false;
}