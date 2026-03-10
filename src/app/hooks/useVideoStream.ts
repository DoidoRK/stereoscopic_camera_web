import { useEffect, useRef, useState } from "react";
import { webSocketVideoStreamAddress } from "../../config";

export default function useVideoStream() {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [videoConnected, setVideoConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;
    const socket = new WebSocket(webSocketVideoStreamAddress);
    socket.binaryType = "arraybuffer";
    socketRef.current = socket;
    let leftCtx: CanvasRenderingContext2D | null = null;
    let rightCtx: CanvasRenderingContext2D | null = null;
    socket.onopen = () => {
      console.log("Video socket connected");
      setVideoConnected(true);
      leftCtx = leftCanvasRef.current?.getContext("2d") ?? null;
      rightCtx = rightCanvasRef.current?.getContext("2d") ?? null;
    };

    socket.onclose = () => {
      console.log("Video socket disconnected");
      setVideoConnected(false);
      socketRef.current = null;
    };

    socket.onerror = (err) => {
      console.error("Video socket error", err);
    };

    socket.onmessage = async (event) => {
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
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  return {
    leftCanvasRef,
    rightCanvasRef,
    videoConnected
  };
}