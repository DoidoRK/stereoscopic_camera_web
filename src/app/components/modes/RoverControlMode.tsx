import { useState, useEffect, useCallback } from "react";

import { ControlPanel } from "../ControlPanel";
import { StatusPanel } from "../StatusPanel";
import { EncodersPanel } from "../EncodersPanel";
import { AccelerometerPanel } from "../AccelerometerPanel";
import { GyroscopePanel } from "../GyroscopePanel";
import { CameraFeed } from "../ui/CameraFeed";

import { useSystem } from "../../context/SystemProvider";

export function RoverControlMode() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const {
    systemData,
    leftCanvasRef,
    rightCanvasRef,
    sendCommand
  } = useSystem();
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (["w", "a", "s", "d"].includes(key)) {
      e.preventDefault();
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.add(key);
        return newSet;
      });
      sendCommand("drive", { key, state: "press" });
    }
  }, [sendCommand]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (["w", "a", "s", "d"].includes(key)) {
      e.preventDefault();
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
      sendCommand("drive", { key, state: "release" });
    }
  }, [sendCommand]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="flex-1 p-6">
      {/* Stereo Camera Feed */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* LEFT CAMERA */}
          <CameraFeed
            CanvasRef={leftCanvasRef}
            cameraConnected={systemData.miscellaneousData.leftCameraConnected}
            cameraFPS={systemData.miscellaneousData.leftCameraFPS}
          />
          {/* RIGHT CAMERA */}
          <CameraFeed
            CanvasRef={rightCanvasRef}
            cameraConnected={systemData.miscellaneousData.rightCameraConnected}
            cameraFPS={systemData.miscellaneousData.rightCameraFPS}
          />
        </div>
      </div>

      {/* Controls & Status */}
      <div className="grid grid-cols-5 gap-4">
        <ControlPanel activeKeys={activeKeys} />
        <StatusPanel
          miscellaneousData={systemData.miscellaneousData}
        />
        <EncodersPanel
          encodersData={systemData.encodersData}
        />
        <GyroscopePanel
          gyroscopeData={systemData.gyroscopeData}
        />
        <AccelerometerPanel
          accelerometerData={systemData.accelerometerData}
        />
      </div>
    </div>
  );
}