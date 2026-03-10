import { useState, useEffect, useCallback } from "react";

import { ControlPanel } from "../ControlPanel";
import { StatusPanel } from "../StatusPanel";
import { EncodersPanel } from "../EncodersPanel";
import { AccelerometerPanel } from "../AccelerometerPanel";
import { GyroscopePanel } from "../GyroscopePanel";

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
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Stereoscopic Camera View</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* LEFT CAMERA */}
          <div className="space-y-2">
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video border-2 border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  color: "var(--color-foreground)"
                }}
              />
              <canvas
                ref={leftCanvasRef}
                width={640}
                height={480}
                className={`absolute inset-0 w-full h-full object-cover ${
                  systemData.miscellaneousData.leftCameraConnected ? "" : "opacity-0"
                }`}
              />
              {!systemData.miscellaneousData.leftCameraConnected && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-mono">
                  Waiting for left camera to connect
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                LEFT
              </div>
              {systemData.miscellaneousData.leftCameraConnected && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                  FPS: {systemData.miscellaneousData.leftCameraFPS.toPrecision(4)}
                </div>
              )}
            </div>
          </div>
          {/* RIGHT CAMERA */}
          <div className="space-y-2">
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video border-2 border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  color: "var(--color-foreground)"
                }}
              />
              <canvas
                ref={rightCanvasRef}
                width={640}
                height={480}
                className={`absolute inset-0 w-full h-full object-cover ${
                  systemData.miscellaneousData.rightCameraConnected ? "" : "opacity-0"
                }`}
              />
              {!systemData.miscellaneousData.rightCameraConnected && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-mono">
                  Waiting for right camera to connect
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                RIGHT
              </div>
              {systemData.miscellaneousData.rightCameraConnected && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                  FPS: {systemData.miscellaneousData.rightCameraFPS.toPrecision(4)}
                </div>
              )}
            </div>
          </div>
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