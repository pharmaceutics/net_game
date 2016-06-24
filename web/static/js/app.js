import "phoenix_html"
import {Game} from "./game"
import {Socket} from "phoenix"

const socket = new Socket("/socket", {})
const game = new Game(window.innerWidth, window.innerHeight, "phaser")
const game_id = Math.random()

game.start(socket)
