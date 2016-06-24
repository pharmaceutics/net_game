import {Play} from "./states/play"

export class Game extends Phaser.Game { constructor(width, height, container) {
  var game = super(width, height, Phaser.AUTO, container)
  this.state.add("play", Play, false)
  this.state.start("play") }
}
