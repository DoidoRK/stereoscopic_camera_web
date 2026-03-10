type MiscellaneousData = {
    broadcasting: boolean;
    calibrating: boolean;
    rightCameraConnected: boolean;
    leftCameraConnected: boolean;
    rightCameraFPS: number;
    leftCameraFPS: number;
}

type StereoCalibrationParams = {
    Baseline: number;
    focalLength: number;
    alignmentError: number;
    disparityRange: number;
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

type EncodersData = {
    frontRightMotorEncoderReading: number;
    frontLeftMotorEncoderReading: number;
    rearRightMotorEncoderReading: number;
    rearLeftMotorEncoderReading: number;
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
  systemStatusSocketConnected: boolean
  commandSocketConnected: boolean
  leftCanvasRef: React.RefObject<HTMLCanvasElement | null>
  rightCanvasRef: React.RefObject<HTMLCanvasElement | null>
  sendCommand: (command: string, value?: any) => void
}

export type ControlMode = 'calibration' | 'control' | 'depth';
export type { MiscellaneousData, AccelerometerData, GyroscopeData, EncodersData, StereoCalibrationParams, SystemData, SystemContextType };