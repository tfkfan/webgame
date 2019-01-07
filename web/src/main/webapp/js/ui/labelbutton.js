LabelButton = function(game, x, y, text, style, onClickHandler){
    Phaser.Text.call(this, game, x, y, text, style);
    this.anchor.set(0.5);
    this.inputEnabled = true;
    this.events.onInputDown.add(onClickHandler, this);
    //adds button to game
    game.add.existing( this );
};

LabelButton.prototype = Object.create(Phaser.Text.prototype);
LabelButton.prototype.constructor = LabelButton;