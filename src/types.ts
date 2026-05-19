type MiscellaneousData = {
  cameraBroadcasting: boolean;
  roverBroadcasting: boolean;
  rightCameraConnected: boolean;
  leftCameraConnected: boolean;
  rightCameraFPS: number;
  leftCameraFPS: number;
}

type AccelerometerData = {
  accelerometerXReading: number;
  accelerometerYReading: number;
  accelerometerZReading: number;
}

type GyroscopeData = {
  gyroscopeXReading: number;
  gyroscopeYReading: number;
  gyroscopeZReading: number;
}

type EncoderReading = {
  encoderDir: string;
  encoderStep: number;
  encoderTurns: number;
  encoderUpdated: boolean;
}

type EncodersData = {
  frontRightMotorEncoderReading: EncoderReading;
  frontLeftMotorEncoderReading: EncoderReading;
  rearRightMotorEncoderReading: EncoderReading;
  rearLeftMotorEncoderReading: EncoderReading;
}

type SystemData = {
  controlMode: number;
  miscellaneousData: MiscellaneousData;
  accelerometerData: AccelerometerData;
  gyroscopeData: GyroscopeData;
  encodersData: EncodersData;
}

type SystemContextType = {
  loading: boolean
  systemData: SystemData
  currentMode: ControlMode
  setCurrentMode: (mode: ControlMode) => void
  videoStreamSocketConnected: boolean
  controlSocketConnected: boolean
  leftCanvasRef: React.RefObject<HTMLCanvasElement | null>
  rightCanvasRef: React.RefObject<HTMLCanvasElement | null>
  sendCommand: (command: string, value?: any) => void
}

export type ControlMode = 'calibration' | 'control' | 'depth';
export type { MiscellaneousData, AccelerometerData, GyroscopeData, EncoderReading, EncodersData, SystemData, SystemContextType };
