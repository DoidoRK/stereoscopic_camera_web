import { useEffect, useRef, useState, useCallback } from "react";
import { videoStreamWebSocketAddress } from "../../config";

export default function useVideoStream() {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [videoConnected, setVideoConnected] = useState(false);
  const pingIntervalRef = useRef<number | null>(null);
  const pongTimeoutRef = useRef<number | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current) return; // Already connecting or connected

    const socket = new WebSocket(videoStreamWebSocketAddress);
    socket.binaryType = "arraybuffer";
    socketRef.current = socket;
    let leftCtx: CanvasRenderingContext2D | null = null;
    let rightCtx: CanvasRenderingContext2D | null = null;

    socket.onopen = () => {
      console.log("Video socket connected");
      setVideoConnected(true);
      leftCtx = leftCanvasRef.current?.getContext("2d") ?? null;
      rightCtx = rightCanvasRef.current?.getContext("2d") ?? null;
      // Start heartbeat
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
          pongTimeoutRef.current = setTimeout(() => {
            console.log("Pong timeout, closing video socket");
            socket.close();
          }, 5000); // 5 second timeout
        }
      }, 10000); // Ping every 10 seconds
    };

    socket.onclose = () => {
      console.log("Video socket disconnected");
      setVideoConnected(false);
      socketRef.current = null;
      // Clear timers
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
      if (pongTimeoutRef.current) {
        clearTimeout(pongTimeoutRef.current);
        pongTimeoutRef.current = null;
      }
      // Schedule reconnect
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 2000); // Reconnect after 2 seconds
    };

    socket.onerror = (err) => {
      console.error("Video socket error", err);
    };

    socket.onmessage = async (event) => {
      if (typeof event.data === "string") {
        // Handle text messages (ping/pong)
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === "pong") {
            // Clear pong timeout
            if (pongTimeoutRef.current) {
              clearTimeout(pongTimeoutRef.current);
              pongTimeoutRef.current = null;
            }
          }
        } catch (err) {
          console.error("Invalid text message", err);
        }
      } else {
        // Handle binary data (video frames)
        const data = new Uint8Array(event.data);
        const side = data[0];
        const jpegBytes = data.subarray(1);
        const blob = new Blob([jpegBytes], { type: "image/jpeg" });
        const bitmap = await createImageBitmap(blob);
        const canvas =
          side === 76
            ? leftCanvasRef.current
            : rightCanvasRef.current;
        if (!canvas) {
          bitmap.close();
          return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          bitmap.close();
          return;
        }
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
      }
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      if (pongTimeoutRef.current) {
        clearTimeout(pongTimeoutRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  return {
    leftCanvasRef,
    rightCanvasRef,
    videoConnected
  };
}