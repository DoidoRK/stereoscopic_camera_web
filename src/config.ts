const WS_STATUS_PORT = 8082;
const WS_CMD_PORT = 8083;
const SERVER_ADDRESS = "localhost"

const webSocketCmdAddress = `ws://${SERVER_ADDRESS}:${WS_CMD_PORT}`
const webSocketStatusAddress = `ws://${SERVER_ADDRESS}:${WS_STATUS_PORT}`

export { webSocketCmdAddress, webSocketStatusAddress };