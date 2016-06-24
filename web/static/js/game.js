import {joinChannel} from "./common/channels"
import {Play} from "./states/play"
import {joinChannel} from './common/channels'

export class Game extends Phaser.Game {
  constructor(width, height, container) {
    var game = super(width, height, Phaser.AUTO, container)
    this.state.add("play", Play, false)
  }

  start(socket) {
    socket.connect()

    const channel = socket.channel("games:lobby", {})
    joinChannel(channel, () => {
      console.log("Joined successfully")
      this.state.start("play", true, false, channel)
    })
  }
}
