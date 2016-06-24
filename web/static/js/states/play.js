import {Socket} from 'phoenix'
import {syncPosition} from '../common/sync'

export class Play extends Phaser.State {
  init(...options) {
    const [channel] = options
    this.channel = channel
    console.log(channel)
    this.game_id = Math.random()
  }
  
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
    // syncPosition(this.bird, this.channel, this.jump)
  }

  update() {
    console.log("dupa")
    if (this.bird.y < 0 || this.bird.y > window.innerHeight) {
        this.restartGame();
    }

    this.syncPosition(this.game_id, this.channel)

  }

  jump() {
    this.bird.body.velocity.y = -350;
  }

  restartGame() {
      this.game.state.start('play', true, false, this.channel);
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
    var box_count = window.innerHeight / 60

    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < box_count; i++)
        if (i != hole && i != hole + 1)
            this.addOnePipe(window.innerWidth, i * 60 + 10);
  }

  syncPosition(game_id, channel) {
    this.sendPosition(game_id, channel)
    //this.receivePosition(game_id, channel)
  }

  sendPosition(game_id, channel) {
    //const message = serializePosition(this.bird)
    console.log("Sending message", game_id)
    channel.push("shout", {game_id})
  }

  serializePosition({x, y}) {
    Object.assign({x, y})
  }

  receivePosition(game_id, channel) {
    channel.on("position", function(message) {
      console.log("Received message", message)
    })
  }
}
