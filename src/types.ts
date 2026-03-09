type MiscellaneousData = {
    broadcasting: boolean;
    calibrating: boolean;
    rightCameraConnected: boolean;
    leftCameraConnected: boolean;
    rightCameraFPS: number;
    leftCameraFPS: number;
}

type StereoCalibrationParams = {}

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
    miscellaneousData: MiscellaneousData;
    accelerometerData: AccelerometerData;
    gyroscopeData: GyroscopeData;
    encodersData: EncodersData;
}

export type ControlMode = 'calibration' | 'control' | 'depth';
export type { MiscellaneousData, AccelerometerData, GyroscopeData, EncodersData, StereoCalibrationParams, SystemData };