import { RefObject } from "react";


interface CameraFeedProps {
  CanvasRef: RefObject<HTMLCanvasElement | null>
  cameraConnected: boolean;
  cameraFPS: number;
  disconnectedMessage: string;
  cameraTitle: string;
}

export function CameraFeed({ CanvasRef, cameraConnected, cameraFPS, disconnectedMessage, cameraTitle }: CameraFeedProps) {
    return (
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
                ref={CanvasRef}
                width={640}
                height={480}
                className={`absolute inset-0 w-full h-full object-cover ${
                  cameraConnected ? "" : "opacity-0"
                }`}
              />
              {!cameraConnected && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-mono">
                  {disconnectedMessage}
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                {cameraTitle}
              </div>
              {cameraConnected && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                  FPS: {cameraFPS.toPrecision(4)}
                </div>
              )}
            </div>
        </div>
    )
}

