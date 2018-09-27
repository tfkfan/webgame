var config = {
    type: Phaser.WEBGL,
    parent: 'webgame',
    width: 800,
    height: 600,
     physics: {
            default: 'impact',
            impact: {
                setBounds: {
                    x: 0,
                    y: 0,
                    width: 3200,
                    height: 600,
                    thickness: 32
                }
            }
        },
    scene: [MainScene]
};

var game = new Phaser.Game(config);

