import { useEffect, useRef, useState, useCallback } from "react";
import { controlStreamWebSocketAddress } from "../../config";
import { jsonToSystemData } from "../../utils";
import { SystemData, ControlMode } from "../../types";

export default function useControlSocket(initialState: SystemData) {
  const storeRef = useRef<SystemData>(initialState);
  const [systemData, setSystemData] = useState<SystemData>(initialState);
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [currentMode, setCurrentMode] = useState<ControlMode>("control");
  const pingIntervalRef = useRef<number | null>(null);
  const pongTimeoutRef = useRef<number | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current) return; // Already connecting or connected

    const socket = new WebSocket(controlStreamWebSocketAddress);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Control socket connected");
      setConnected(true);
      // Start heartbeat
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
          pongTimeoutRef.current = setTimeout(() => {
            console.log("Pong timeout, closing control socket");
            socket.close();
          }, 5000); // 5 second timeout
        }
      }, 10000); // Ping every 10 seconds
    };

    socket.onclose = () => {
      console.log("Control socket disconnected");
      setConnected(false);
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
      console.error("Control socket error", err);
    };

    socket.onmessage = (message) => {
      try {
        const parsed = JSON.parse(message.data);
        if (parsed.type === "pong") {
          // Clear pong timeout
          if (pongTimeoutRef.current) {
            clearTimeout(pongTimeoutRef.current);
            pongTimeoutRef.current = null;
          }
        } else if (parsed.type === "telemetry") {
          // Process incoming telemetry data
          storeRef.current = jsonToSystemData(parsed.data);
        } else {
          // Legacy: treat as telemetry data if no type specified
          storeRef.current = jsonToSystemData(parsed);
        }
      } catch (err) {
        console.error("Invalid control message", err);
      }
    };
  }, []);

  // Connect on mount
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

  // Update UI with telemetry data at 10Hz
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData({ ...storeRef.current });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Send mode changes
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    if (socket.readyState !== WebSocket.OPEN) return;
    socket.send(
      JSON.stringify({
        type: "mode",
        mode: currentMode
      })
    );
  }, [currentMode]);

  const sendCommand = useCallback(
    (command: string, state: "press" | "release") => {
      const socket = socketRef.current;
      if (!socket) return;
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(
        JSON.stringify({
          type: "command",
          command,
          state
        })
      );
    },
    []
  );

  return {
    systemData,
    connected,
    currentMode,
    setCurrentMode,
    sendCommand
  };
}
