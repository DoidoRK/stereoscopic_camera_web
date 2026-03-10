import { useEffect, useRef, useState, useCallback } from "react";
import { commandSocketAddress } from "../../config";
import { ControlMode } from "../../types";

export default function useRobotControl() {
  const socketRef = useRef<WebSocket | null>(null);
  const [commandConnected, setCommandConnected] = useState(false);
  const [currentMode, setCurrentMode] = useState<ControlMode>("control");

  useEffect(() => {
    const socket = new WebSocket(commandSocketAddress);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Command socket connected");
      setCommandConnected(true);
    };

    socket.onclose = () => {
      console.log("Command socket disconnected");
      setCommandConnected(false);
      socketRef.current = null;
    };

    socket.onerror = (err) => {
      console.error("Command socket error", err);
    };

    return () => socket.close();
  }, []);

  const sendCommand = useCallback(
    (command: string, state: "press" | "release") => {
      const socket = socketRef.current;
      if (!socket) return;
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(
        JSON.stringify({
          command,
          state
        })
      );
    },
    []
  );

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

  return {
    sendCommand,
    commandConnected,
    currentMode,
    setCurrentMode
  };

}