import { useState } from 'react';
import { Crosshair, Grid3x3, Maximize2, RefreshCw } from 'lucide-react';

export function CalibrationMode() {
  const [showGrid, setShowGrid] = useState(true);
  const [showCrosshair, setShowCrosshair] = useState(true);

  const calibrationParams = [
    { label: 'Baseline', value: '120mm', adjustable: true },
    { label: 'Focal Length', value: '3.6mm', adjustable: true },
    { label: 'Alignment Error', value: '0.3°', adjustable: false },
    { label: 'Disparity Range', value: '0-128px', adjustable: true },
  ];

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stereoscopic Camera Calibration</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Align and calibrate your stereo camera system
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" />
          Auto Calibrate
        </button>
      </div>

      {/* Stereo Camera Feed */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Camera */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Left Camera</h3>
          <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video border-2 border-primary">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
            

            {/* Camera label */}
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
              LEFT CAM
            </div>
            
          </div>
        </div>

        {/* Right Camera */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Right Camera</h3>
          <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video border-2 border-green-500">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />

            {/* Camera label */}
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
              RIGHT CAM
            </div>
            
          </div>
        </div>
      </div>

      {/* Controls and Parameters */}
      <div className="grid grid-cols-2 gap-4">
        {/* Calibration Tools */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-medium mb-4">Calibration Tools</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <Grid3x3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Show Grid Overlay</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCrosshair}
                onChange={(e) => setShowCrosshair(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <Crosshair className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Show Crosshair</span>
            </label>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Calibration Progress</div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: '65%' }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">65%</div>
          </div>
        </div>

        {/* Camera Parameters */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-medium mb-4">Camera Parameters</h3>
          
          <div className="space-y-3">
            {calibrationParams.map((param) => (
              <div key={param.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{param.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{param.value}</span>
                  {param.adjustable && (
                    <button className="p-1 hover:bg-accent rounded transition-colors">
                      <Maximize2 className="w-3 h-3 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-secondary hover:bg-accent py-2 rounded-lg text-sm transition-colors">
            Save Calibration
          </button>
        </div>
      </div>

      {/* Status Messages */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 bg-primary rounded-full mt-1.5" />
          <p className="text-sm text-foreground">
            Place a checkerboard pattern 1-2 meters in front of both cameras for optimal calibration results.
          </p>
        </div>
      </div>
    </div>
  );
}