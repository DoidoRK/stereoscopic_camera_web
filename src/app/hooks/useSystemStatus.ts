import { useEffect, useRef, useState } from "react";
import { webSocketSystemStatusAddress } from "../../config";
import { jsonToSystemData } from "../../utils";
import { SystemData } from "../../types";

export default function useSystemStatus(initialState: SystemData) {

  const storeRef = useRef<SystemData>(initialState);

  const [systemData, setSystemData] = useState<SystemData>(initialState);

  const socketRef = useRef<WebSocket | null>(null);

  const [statusConnected, setStatusConnected] = useState(false);

  useEffect(() => {

    const socket = new WebSocket(webSocketSystemStatusAddress);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Status socket connected");
      setStatusConnected(true);
    };

    socket.onclose = () => {
      console.log("Status socket disconnected");
      setStatusConnected(false);
      socketRef.current = null;
    };

    socket.onerror = (err) => {
      console.error("Status socket error", err);
    };

    socket.onmessage = (message) => {

      try {

        const parsed = JSON.parse(message.data);

        storeRef.current = jsonToSystemData(parsed);

      } catch (err) {

        console.error("Invalid status message", err);

      }

    };

    return () => socket.close();

  }, []);

  useEffect(() => {

    const interval = setInterval(() => {

      setSystemData({ ...storeRef.current });

    }, 100); // 10Hz UI update

    return () => clearInterval(interval);

  }, []);

  return {
    systemData,
    statusConnected
  };
}