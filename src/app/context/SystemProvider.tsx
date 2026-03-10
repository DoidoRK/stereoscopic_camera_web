import { createContext, useContext, ReactNode, useMemo } from "react";
import { SystemData, ControlMode } from "../../types";

import useVideoStream from "../hooks/useVideoStream";
import useSystemStatus from "../hooks/useSystemStatus";
import useRobotControl from "../hooks/useRobotControl";

type SystemContextType = {

  loading: boolean

  systemData: SystemData

  currentMode: ControlMode
  setCurrentMode: (mode: ControlMode) => void

  videoStreamSocketConnected: boolean
  systemStatusSocketConnected: boolean
  commandSocketConnected: boolean

  

  leftCanvasRef: React.RefObject<HTMLCanvasElement | null>
  rightCanvasRef: React.RefObject<HTMLCanvasElement | null>

  sendCommand: (command: string, value?: any) => void
}

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
    }
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
  TELEMETRY
  */
  const {
    systemData,
    statusConnected
  } = useSystemStatus(initialSystemState);

  /*
  CONTROL
  */
  const {
    currentMode,
    setCurrentMode,
    sendCommand,
    commandConnected
  } = useRobotControl();

  const loading = !(videoConnected || statusConnected);

  const value = useMemo(() => ({
    loading,
    systemData,

    currentMode,
    setCurrentMode,

    videoStreamSocketConnected: videoConnected,
    systemStatusSocketConnected: statusConnected,
    commandSocketConnected: commandConnected,

    leftCanvasRef,
    rightCanvasRef,

    sendCommand
  }), [
    loading,
    systemData,
    currentMode,
    videoConnected,
    statusConnected,
    commandConnected
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