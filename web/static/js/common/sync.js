// sendPosition :: Sprite -> Channel -> String
export const sendPosition = (sprite, channel) => {
  const message = serializePosition(sprite)
  console.log("Sending message", message)
  channel.push("position", message)
}
export const syncPosition = (sprite, channel, event) => {
  event.add(sprite => sendPosition(sprite, channel))
  receivePosition(sprite, channel)
}
// receivePosition = Sprite -> Channel -> Push
export const receivePosition = (sprite, channel) => {
  const callback = (message) => {
    console.log("Received message", message)
    const {x,y} = message
    sprite.position.setTo(x, y)
  } 
  channel.on("position", callback)
}
