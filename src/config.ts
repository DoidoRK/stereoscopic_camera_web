const CAMERA_STREAM_PORT = 8765;
const CONTROL_STREAM_PORT = 8766;
const SERVER_ADDRESS = "raspberry.local"

const videoStreamWebSocketAddress = `ws://${SERVER_ADDRESS}:${CAMERA_STREAM_PORT}`
const controlStreamWebSocketAddress = `ws://${SERVER_ADDRESS}:${CONTROL_STREAM_PORT}`

export { videoStreamWebSocketAddress, controlStreamWebSocketAddress };
