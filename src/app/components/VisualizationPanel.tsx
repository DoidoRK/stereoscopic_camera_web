import { useEffect, useRef, useState } from 'react';
import { EncodersData } from '../../types';

interface EncodersPanelProps {
  encodersData: EncodersData;
  leftCameraConnected: boolean;
  rightCameraConnected: boolean;
}

export function VisualizationPanel({ encodersData, leftCameraConnected, rightCameraConnected }: EncodersPanelProps) {
  const prev = useRef(encodersData);

  const [offsets, setOffsets] = useState({
    fl: 0,
    fr: 0,
    rl: 0,
    rr: 0,
  });

  useEffect(() => {
    const factor = 1.5;

    const flDelta =
      encodersData.frontLeftMotorEncoderReading.encoderStep - prev.current.frontRightMotorEncoderReading.encoderStep

    const frDelta =
      encodersData.frontRightMotorEncoderReading.encoderStep -
      prev.current.frontRightMotorEncoderReading.encoderStep;

    const rlDelta =
      encodersData.rearLeftMotorEncoderReading.encoderStep -
      prev.current.rearLeftMotorEncoderReading.encoderStep;

    const rrDelta =
      encodersData.rearRightMotorEncoderReading.encoderStep -
      prev.current.rearRightMotorEncoderReading.encoderStep;

    setOffsets((prevOffsets) => ({
      fl: prevOffsets.fl + flDelta * factor,
      fr: prevOffsets.fr + frDelta * factor,
      rl: prevOffsets.rl + rlDelta * factor,
      rr: prevOffsets.rr + rrDelta * factor,
    }));

    prev.current = encodersData;
  }, [encodersData]);

  const Camera = ({ active, className }: any) => (
    <div className={`absolute flex flex-col items-center ${className}`}>
      {/* Top (smaller box) */}
      <div
        className={`
          w-3 h-1
          ${active ? 'bg-primary' : 'bg-destructive'}
        `}
      />

      {/* Bottom (bigger box) */}
      <div
        className={`
          w-6 h-3
          ${active ? 'bg-primary border-primary' : 'bg-destructive border-destructive'}
        `}
      />
    </div>
  );

  const Wheel = ({ value, offset }: any) => {
    const directionColor =
      value > 0 ? 'border-green-500' : value < 0 ? 'border-red-500' : 'border-border';

    return (
      <div
        className={`
          flex items-center gap-2
        `}
      >

        {/* Wheel */}
        <div
          className={`
            w-10 h-20 rounded-md border-2 overflow-hidden
            ${directionColor}
          `}
        >
          <div
            className="w-full h-full bg-muted"
            style={{
              transform: `translateY(${offset % 20}px)`,
              transition: 'transform 0.1s linear',
              backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                rgba(0,0,0,0.75) 0px,
                rgba(0,0,0,0.75) 4px,
                rgba(0,0,0,0.50) 4px,
                rgba(0,0,0,0.50) 10px
              )
            `,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border flex justify-center">
      <div className="grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4">
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">Front Left Motor</span>
            </div>
            <div className="text-lg font-mono">{encodersData.frontLeftMotorEncoderReading.encoderStep}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">Rear Left Motor</span>
            </div>
            <div className="text-lg font-mono">{encodersData.rearLeftMotorEncoderReading.encoderStep}</div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4 justify-end">
          <Wheel
            label="FL"
            value={encodersData.frontLeftMotorEncoderReading.encoderStep}
            offset={offsets.fl}
          />
          <Wheel
            label="RL"
            value={encodersData.rearLeftMotorEncoderReading.encoderStep}
            offset={offsets.rl}
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-32 h-48 bg-muted rounded-xl">
            {/* Cameras */}
            <Camera active={leftCameraConnected} className="absolute top-2 left-4" />
            <Camera active={rightCameraConnected} className="absolute top-2 right-4" />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <Wheel
            label="FR"
            value={encodersData.frontRightMotorEncoderReading.encoderStep}
            offset={offsets.fr}
          />
          <Wheel
            label="RR"
            value={encodersData.rearRightMotorEncoderReading.encoderStep}
            offset={offsets.rr}
          />
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">Front Right Motor</span>
            </div>
            <div className="text-lg font-mono">{encodersData.frontRightMotorEncoderReading.encoderStep}</div>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">Rear Right Motor</span>
            </div>
            <div className="text-lg font-mono">{encodersData.rearRightMotorEncoderReading.encoderStep}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
