//Create our only scene called mainScene, in the game
class mainScene {


    preload(){
        //Method called once at the beginning
        // It will load all the assets for the game

        //Parameters: name of the sprite, path of the image
        this.load.image('player', 'assets/player.png');

        this.load.image('lemon', 'assets/collectable.png');
    }
    create(){
        //called once just after preload()
        //It will initialize out scene, like positoins of the sprites

        // Parameters: x position, y position, name of the sprite
        this.player = this.physics.add.sprite(100, 100, 'player');

        this.lemon = this.physics.add.sprite(200, 200, 'lemon');

        // Store in a variable, starts at 0
        this.score = 0;

        // Style of the text, Lots of options
        let style = { font: '15px Arial', fill: '#fff' };

        //Display the score in the top left then the text for it and the style
        this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();
    }

    hit() {
        // Change the position of the lemon after collection
        this.lemon.x = Phaser.Math.Between(100, 600);
        this.lemon.y = Phaser.Math.Between(100, 300);

        // Add 10 to the score
        this.score += 10;

        // Display the score 
        this.scoreText.setText('Score: ' + this.score);

        this.tweens.add({
            targets: this.player, // for plater
            duration: 200, // for 200 MS
            scaleX: 1.9, // scale it up
            scaleY: 1.9, // scale it up
            yoyo: true, //at the end go back to original size
        });
    }

    update(){
        //Called 60 times a second after create()
        // Handles game logic

        if(this.arrow.left.isDown){
            this.player.x -= 3;
        } else if(this.arrow.right.isDown){
            this.player.x += 3;
        }

        if(this.arrow.up.isDown){
            this.player.y -= 3;
        } else if(this.arrow.down.isDown){
            this.player.y += 3;
        }

        if (this.physics.overlap(this.player, this.lemon)) {
            this.hit();
        }
    }
}

new Phaser.Game({
    width: 1400, // Width of the game in pixel
    height: 800, // Height of the game in pixel
    backgroundColor: '#000000', // Background color
    scene: mainScene, // Name of the scene
    physics: { default: 'arcade'}, // Physics engine we use
    parent: 'game', // Where to draw the game in <div id="game">
})