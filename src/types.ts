enum MessageOp {
    SYSTEM_STARTUP,
    SYSTEM_PARAM_CHANGE,
    SYSTEM_SHUTDOWN
}

type SystemParams = {
    broadcasting: boolean;
    calibrating: boolean;
    rightCameraConnected: boolean;
    leftCameraConnected: boolean;
    rightCameraFPS: number;
    leftCameraFPS: number;
}

type StereoCalibrationParams = {}

type SensorReadings = {
    frontRightMotorEncoderReading: number;
    frontLeftMotorEncoderReading: number;
    rearRightMotorEncoderReading: number;
    rearLeftMotorEncoderReading: number;
    accelerometerXReading: number;
    accelerometerYReading: number;
    accelerometerZReading: number;
    gyroscopeXReading: number;
    gyroscopeYReading: number;
    gyroscopeZReading: number;
}

export type ControlMode = 'calibration' | 'control' | 'depth';
export { MessageOp };
export type { SystemParams, SensorReadings, StereoCalibrationParams };