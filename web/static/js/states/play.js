export class Play extends Phaser.State {
  preload() {
    this.load.image('bird', 'images/bird.png');
    this.load.image('pipe', 'images/pipe.png');
  }

  create() {
    this.game.stage.backgroundColor = '#71c5cf';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bird = this.game.add.sprite(100, 245, 'bird');
    this.game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;


    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceKey.onDown.add(this.jump, this);

    this.pipes = this.game.add.group();

    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
  }

  update() {
    if (this.bird.y < 0 || this.bird.y > 490) {
        this.restartGame();
    }
  }

  jump() {
    this.bird.body.velocity.y = -350;
  }

  restartGame() {
      this.game.state.start('play');
  }

  addOnePipe(x, y) {
    var pipe = this.game.add.sprite(x, y, 'pipe');

    this.pipes.add(pipe);

    this.game.physics.arcade.enable(pipe);

    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1)
            this.addOnePipe(window.innerWidth, i * 60 + 10);
  }
}
