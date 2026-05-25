import { useState, useEffect, useCallback } from "react";

import { ControlPanel } from "../ControlPanel";
import { StatusPanel } from "../StatusPanel";
import { AccelerometerPanel } from "../AccelerometerPanel";
import { GyroscopePanel } from "../GyroscopePanel";
import { CameraFeed } from "../ui/CameraFeed";

import { useSystem } from "../../context/SystemProvider";
import { VisualizationPanel } from "../VisualizationPanel";

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

    if (["w", "a", "s", "d", "z"].includes(key)) {
      e.preventDefault();

      if (e.repeat) return;

      setActiveKeys(prev => new Set(prev).add(key));
    }

    if (key === "z") {
      e.preventDefault();

      // prevent holding spam
      if (e.repeat) return;

      sendCommand("saveImage", { key, state: "press" });
    }
  }, [sendCommand]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();

    if (["w", "a", "s", "d", "z"].includes(key)) {
      e.preventDefault();

      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      activeKeys.forEach((key) => {
        if (["w", "a", "s", "d"].includes(key)) {
          sendCommand("drive", { key, state: "press" });
        }
      });

      if (activeKeys.size === 0) {
        sendCommand("drive", { key: "none", state: "stop" });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeKeys, sendCommand]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="flex-1 p-2 space-y-4">
      {/* Stereo Camera Feed */}
      <div className="grid grid-cols-2 gap-4">
        {/* LEFT CAMERA */}
        <CameraFeed
          CanvasRef={leftCanvasRef}
          cameraConnected={systemData.miscellaneousData.leftCameraConnected}
          cameraFPS={systemData.miscellaneousData.leftCameraFPS}
          cameraTitle="Left Camera"
          disconnectedMessage="Waiting for left camera to connect"
        />
        {/* RIGHT CAMERA */}
        <CameraFeed
          CanvasRef={rightCanvasRef}
          cameraConnected={systemData.miscellaneousData.rightCameraConnected}
          cameraFPS={systemData.miscellaneousData.rightCameraFPS}
          cameraTitle="Right Camera"
          disconnectedMessage="Waiting for right camera to connect"
        />
      </div>

      {/* Controls & Status */}
      <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-4">
        <div className="grid grid-rows-2 gap-4">
          <ControlPanel activeKeys={activeKeys} />
          <GyroscopePanel
            gyroscopeData={systemData.gyroscopeData}
          />
        </div>
        <VisualizationPanel
          leftCameraConnected={systemData.miscellaneousData.leftCameraConnected}
          rightCameraConnected={systemData.miscellaneousData.rightCameraConnected}
          encodersData={systemData.encodersData}
        />
        <div className="grid grid-rows-2 gap-4">
          <StatusPanel
            miscellaneousData={systemData.miscellaneousData}
          />
          <AccelerometerPanel
            accelerometerData={systemData.accelerometerData}
          />
        </div>
      </div>
    </div>
  );
}
