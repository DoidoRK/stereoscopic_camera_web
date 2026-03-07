import { useState, useEffect, useCallback, useRef } from 'react';
import { MessageOp, SystemParams, SensorReadings, ControlMode } from '../types';
import { webSocketVideoStreamAddress, webSocketSystemStatusAddress } from '../config';
import { jsonToSensorReadings, jsonToSystemParams } from '../utils';

const useSystemSimulation = () => {
    const systemParametersInitialState: SystemParams = {
        broadcasting: false,
        calibrating: false,
        rightCameraConnected: false,
        leftCameraConnected: false,
        rightCameraFPS: 0,
        leftCameraFPS: 0,
    };
    
    const sensorReadingsInitialState: SensorReadings = {
        frontRightMotorEncoderReading: 0,
        frontLeftMotorEncoderReading: 0,
        rearRightMotorEncoderReading: 0,
        rearLeftMotorEncoderReading: 0,
        accelerometerXReading: 0,
        accelerometerYReading: 0,
        accelerometerZReading: 0,
        gyroscopeXReading: 0,
        gyroscopeYReading: 0,
        gyroscopeZReading: 0,
    };

    //Data from websockets
    const [systemParams, setSystemParams] = useState<SystemParams>(systemParametersInitialState);
    const [sensorReadings, setSensorReadings] = useState<SensorReadings>(sensorReadingsInitialState);
    const [videoStreamSocketConnected, setVideoStreamSocketConnected] = useState(false);
    const videoStreamSocketRef = useRef<WebSocket | null>(null);
    const [systemStatusSocketConnected, setSystemStatusSocketConnected] = useState(false);
    const systemStatusSocketRef = useRef<WebSocket | null>(null);

    //Webpage states
    const [loading, setLoading] = useState(true);
    const [currentMode, setCurrentMode] = useState<ControlMode>('control');

    useEffect(() => {
        if(videoStreamSocketRef.current === null){
            const VideoStreamSocket = new WebSocket(webSocketVideoStreamAddress);
            videoStreamSocketRef.current = VideoStreamSocket;
    
            VideoStreamSocket.onopen = () => {
                console.log('Command WebSocket Connected server');
                setVideoStreamSocketConnected(true);
            };
    
            VideoStreamSocket.onclose = () => {
                console.log('Command WebSocket Disconnected server');
                setVideoStreamSocketConnected(false);
            };
    
            VideoStreamSocket.onmessage = (message) => {
                // video stream connection (binary images); each packet begins with
                // an ASCII side identifier ('L' or 'R') followed by JPEG bytes.
                if (!(message.data instanceof Blob)) return;
                const reader = new FileReader();
                reader.onload = function() {
                    const data = new Uint8Array(message.data as ArrayBuffer);
                    const side = String.fromCharCode(data[0]);
                    const imgBlob = new Blob([data.subarray(1)], {type: 'image/jpeg'});
                    const url = URL.createObjectURL(imgBlob);
                    // const imgEl = document.getElementById(
                    //     side === 'L' ? 'stream-left' : 'stream-right'
                    // );
                    // imgEl.src = url;
                    setTimeout(() => URL.revokeObjectURL(url), 100);
                };
                reader.readAsArrayBuffer(message.data);
            };
        }
    }, [videoStreamSocketConnected]);

    useEffect(() => {
        if (!videoStreamSocketConnected && !systemStatusSocketConnected) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [videoStreamSocketConnected, systemStatusSocketConnected]);

    useEffect(() => {
        if(systemStatusSocketRef.current === null){
            const statusSocket = new WebSocket(webSocketSystemStatusAddress);
            systemStatusSocketRef.current = statusSocket;
    
            statusSocket.onopen = () => {
                console.log('WebSocket Status Connected');
                setSystemStatusSocketConnected(true);
            };
    
            statusSocket.onclose = () => {
                console.log('Status WebSocket disconnected');
                setSystemStatusSocketConnected(false);
            };
    
            statusSocket.onmessage = (message) => {
                setSystemParams(jsonToSystemParams(JSON.parse(message.data)));
                // setSensorReadings(jsonToSensorReadings(JSON.parse(message.data)));
            };
        }
    }, []);

    return { 
        loading,
        systemParams,
        sensorReadings,
        currentMode,
        videoStreamSocketConnected,
        systemStatusSocketConnected,
        setCurrentMode
    };
};

export default useSystemSimulation;