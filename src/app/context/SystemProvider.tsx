import { createContext, useContext, ReactNode, useMemo } from "react";
import { SystemData, ControlMode, SystemContextType } from "../../types";

import useVideoStream from "../hooks/useVideoStream";
import useControlSocket from "../hooks/useControlSocket";

const SystemContext = createContext<SystemContextType | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {

  const initialSystemState: SystemData = {
    controlMode: 0,
    miscellaneousData: {
      broadcasting: false,
      calibrating: false,
      rightCameraConnected: false,
      leftCameraConnected: false,
      rightCameraFPS: 0,
      leftCameraFPS: 0
    },
    encodersData:{
      frontRightMotorEncoderReading:0,
      frontLeftMotorEncoderReading:0,
      rearRightMotorEncoderReading:0,
      rearLeftMotorEncoderReading:0
    },
    accelerometerData:{
      accelerometerXReading:0,
      accelerometerYReading:0,
      accelerometerZReading:0
    },
    gyroscopeData:{
      gyroscopeXReading:0,
      gyroscopeYReading:0,
      gyroscopeZReading:0
    },
  };

  /*
  VIDEO
  */
  const {
    leftCanvasRef,
    rightCanvasRef,
    videoConnected
  } = useVideoStream();

  /*
  CONTROL & TELEMETRY (unified socket)
  */
  const {
    systemData,
    connected: controlConnected,
    currentMode,
    setCurrentMode,
    sendCommand
  } = useControlSocket(initialSystemState);

  const loading = !(videoConnected && controlConnected);
  const value = useMemo(() => ({
    loading,
    systemData,
    currentMode,
    setCurrentMode,
    controlSocketConnected: controlConnected,
    videoStreamSocketConnected: videoConnected,
    leftCanvasRef,
    rightCanvasRef,
    sendCommand
  }), [
    loading,
    systemData,
    currentMode,
    videoConnected,
    controlConnected
  ]);

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used inside SystemProvider");
  }
  return context;
}