import { MiscellaneousData, AccelerometerData, EncodersData, GyroscopeData, SystemData, ControlMode } from './types';

const jsonToMiscellaneousData = (json: any): MiscellaneousData => {
    return {
        broadcasting: json.broadcasting,
        calibrating: json.calibrating,
        rightCameraFPS: json.rightCameraFPS,
        leftCameraFPS: json.leftCameraFPS,
        rightCameraConnected: json.rightCameraConnected,
        leftCameraConnected: json.leftCameraConnected
    };
};

const jsonToAccelerometerData = (json: any): AccelerometerData => {
    return {
        accelerometerXReading: json.accelerometerXReading,
        accelerometerYReading: json.accelerometerYReading,
        accelerometerZReading: json.accelerometerZReading,
    };
};

const jsonToGyroscopeData = (json: any): GyroscopeData => {
    return {
        gyroscopeXReading: json.gyroscopeXReading,
        gyroscopeYReading: json.gyroscopeYReading,
        gyroscopeZReading: json.gyroscopeZReading
    };
};

const jsonToEncodersData = (json: any): EncodersData => {
    return {
        frontRightMotorEncoderReading: json.frontRightMotorEncoderReading,
        frontLeftMotorEncoderReading: json.frontLeftMotorEncoderReading,
        rearRightMotorEncoderReading: json.rearRightMotorEncoderReading,
        rearLeftMotorEncoderReading: json.rearLeftMotorEncoderReading,
    };
};

const jsonToSystemData = (json: any): SystemData => {
    return {
        controlMode: json.ControlMode,
        miscellaneousData: jsonToMiscellaneousData(json.miscellaneousData),
        accelerometerData: jsonToAccelerometerData(json.accelerometerData),
        gyroscopeData: jsonToGyroscopeData(json.gyroscopeData),
        encodersData: jsonToEncodersData(json.encodersData)
    }
}


export { jsonToSystemData };