import { SystemParams, SensorReadings } from './types';

const jsonToSystemParams = (json: any): SystemParams => {
    return {
        broadcasting: json.broadcasting,
        calibrating: json.calibrating,
        rightCameraFPS: json.rightCameraFPS,
        leftCameraFPS: json.leftCameraFPS,
        rightCameraConnected: json.rightCameraConnected,
        leftCameraConnected: json.leftCameraConnected
    };
};

const jsonToSensorReadings = (json: any): SensorReadings => {
    return {
        frontRightMotorEncoderReading: json.frontRightMotorEncoderReading,
        frontLeftMotorEncoderReading: json.frontLeftMotorEncoderReading,
        rearRightMotorEncoderReading: json.rearRightMotorEncoderReading,
        rearLeftMotorEncoderReading: json.rearLeftMotorEncoderReading,
        accelerometerXReading: json.accelerometerXReading,
        accelerometerYReading: json.accelerometerYReading,
        accelerometerZReading: json.accelerometerZReading,
        gyroscopeXReading: json.gyroscopeXReading,
        gyroscopeYReading: json.gyroscopeYReading,
        gyroscopeZReading: json.gyroscopeZReading
    };
  };

export { jsonToSystemParams, jsonToSensorReadings };