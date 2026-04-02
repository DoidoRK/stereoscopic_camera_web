import { useState, useEffect, useCallback } from "react";
import { CameraFeed } from "../ui/CameraFeed";
import { useSystem } from "../../context/SystemProvider";

export function SavePicturesMode() {
  const [activeKeys] = useState<Set<string>>(new Set());
  const {
    systemData,
    leftCanvasRef,
    rightCanvasRef,
    sendCommand
  } = useSystem();

  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Save Pictures</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Save pictures for later use
        </p>
      </div>
      {/* Stereo Camera Feed */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
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
      </div>
    </div>
  );
}