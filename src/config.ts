const CAMERA_STREAM_PORT = 8765;
const SYSTEM_STATUS_PORT = 8766;
const COMMAND_PORT = 8767;
const SERVER_ADDRESS = "localhost"

const webSocketVideoStreamAddress = `ws://${SERVER_ADDRESS}:${CAMERA_STREAM_PORT}`
const webSocketSystemStatusAddress = `ws://${SERVER_ADDRESS}:${SYSTEM_STATUS_PORT}`
const commandSocketAddress = `ws://${SERVER_ADDRESS}:${COMMAND_PORT}`

export { webSocketVideoStreamAddress, webSocketSystemStatusAddress, commandSocketAddress };