const CAMERA_STREAM_PORT = 8765;
const CONTROL_STREAM_PORT = 8766;

const hostname =
  window.location.hostname;

const protocol =
  window.location.protocol === "https:"
    ? "wss"
    : "ws";

const videoStreamWebSocketAddress =
  `${protocol}://${hostname}:${CAMERA_STREAM_PORT}`;

const controlStreamWebSocketAddress =
  `${protocol}://${hostname}:${CONTROL_STREAM_PORT}`;

export {
  videoStreamWebSocketAddress,
  controlStreamWebSocketAddress
};
