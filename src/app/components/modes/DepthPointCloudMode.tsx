import { useState } from 'react';
import { Scan, Download, RotateCcw, Play, Loader2 } from 'lucide-react';

export function DepthPointCloudMode() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [viewMode, setViewMode] = useState<'depth' | 'pointcloud'>('depth');

  const handleGenerate = () => {
    setIsGenerating(true);
    console.log('Generating depth map and point cloud...');
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setHasData(true);
      console.log('Depth data generated successfully');
    }, 2000);
  };

  const depthParams = [
    { label: 'Min Depth', value: '0.5m', unit: 'm' },
    { label: 'Max Depth', value: '10.0m', unit: 'm' },
    { label: 'Resolution', value: '640x480', unit: 'px' },
    { label: 'Point Density', value: 'High', unit: '' },
  ];

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Depth Image & Point Cloud</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Generate and visualize 3D environment mapping
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground disabled:text-muted-foreground px-4 py-2 rounded-lg transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate Scan
              </>
            )}
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 bg-card p-1 rounded-lg w-fit border border-border">
        <button
          onClick={() => setViewMode('depth')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            viewMode === 'depth' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Depth Image
        </button>
        <button
          onClick={() => setViewMode('pointcloud')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            viewMode === 'pointcloud' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Point Cloud
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Visualization Area */}
        <div className="col-span-2 space-y-4">
          {/* Depth/Point Cloud Viewer */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">
                {viewMode === 'depth' ? 'Depth Map' : '3D Point Cloud'}
              </h3>
              {hasData && (
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-accent rounded transition-colors" title="Reset View">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {!hasData ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Scan className="w-16 h-16" />
                  <div className="text-center">
                    <p className="font-medium">No scan data available</p>
                    <p className="text-sm mt-1">Click "Generate Scan" to create depth map</p>
                  </div>
                </div>
              ) : viewMode === 'depth' ? (
                <>
                  {/* Depth map visualization */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-red-900 opacity-70" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '10px 10px'
                    }} />
                  </div>
                  
                  {/* Depth scale */}
                  <div className="absolute right-4 top-4 bottom-4 w-8 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 rounded-lg border border-border">
                    <div className="absolute -right-12 top-0 text-xs text-muted-foreground">10m</div>
                    <div className="absolute -right-12 bottom-0 text-xs text-muted-foreground">0m</div>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-2 rounded-lg text-xs space-y-1">
                    <div className="text-gray-400">Min: <span className="text-white">0.52m</span></div>
                    <div className="text-gray-400">Max: <span className="text-white">8.34m</span></div>
                    <div className="text-gray-400">Points: <span className="text-white">307,200</span></div>
                  </div>
                </>
              ) : (
                <>
                  {/* Point cloud visualization */}
                  <div className="absolute inset-0 bg-black">
                    {/* Simulated point cloud */}
                    {Array.from({ length: 200 }).map((_, i) => {
                      const x = Math.random() * 100;
                      const y = Math.random() * 100;
                      const depth = Math.random();
                      const size = 1 + Math.random() * 2;
                      const hue = 240 - depth * 240; // Blue to red
                      
                      return (
                        <div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: `hsl(${hue}, 80%, 60%)`,
                            boxShadow: `0 0 ${size * 2}px hsl(${hue}, 80%, 60%)`
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* 3D axis indicators */}
                  <div className="absolute bottom-4 left-4 w-16 h-16">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* X axis - red */}
                      <line x1="50" y1="50" x2="90" y2="50" stroke="#ef4444" strokeWidth="2" />
                      <text x="95" y="55" fill="#ef4444" fontSize="12">X</text>
                      
                      {/* Y axis - green */}
                      <line x1="50" y1="50" x2="50" y2="10" stroke="#22c55e" strokeWidth="2" />
                      <text x="45" y="8" fill="#22c55e" fontSize="12">Y</text>
                      
                      {/* Z axis - blue */}
                      <line x1="50" y1="50" x2="25" y2="75" stroke="#3b82f6" strokeWidth="2" />
                      <text x="15" y="85" fill="#3b82f6" fontSize="12">Z</text>
                    </svg>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-2 rounded-lg text-xs">
                    <div className="text-gray-400">Drag to rotate view</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total Points', value: hasData ? '307,200' : '---' },
              { label: 'Scan Time', value: hasData ? '1.8s' : '---' },
              { label: 'Coverage', value: hasData ? '94%' : '---' },
              { label: 'Accuracy', value: hasData ? '±2cm' : '---' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-lg font-mono">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Parameters & Controls */}
        <div className="space-y-4">
          {/* Scan Parameters */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-medium mb-4">Scan Parameters</h3>
            
            <div className="space-y-4">
              {depthParams.map((param) => (
                <div key={param.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{param.label}</span>
                    <span className="font-mono">{param.value}</span>
                  </div>
                  {param.unit && (
                    <input
                      type="range"
                      className="w-full accent-primary"
                      disabled={isGenerating}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-medium mb-4">Export Options</h3>
            
            <div className="space-y-2">
              <button 
                disabled={!hasData}
                className="w-full bg-secondary hover:bg-accent disabled:bg-secondary/50 disabled:text-muted-foreground py-2 rounded-lg text-sm transition-colors"
              >
                Export as PLY
              </button>
              <button 
                disabled={!hasData}
                className="w-full bg-secondary hover:bg-accent disabled:bg-secondary/50 disabled:text-muted-foreground py-2 rounded-lg text-sm transition-colors"
              >
                Export as PCD
              </button>
              <button 
                disabled={!hasData}
                className="w-full bg-secondary hover:bg-accent disabled:bg-secondary/50 disabled:text-muted-foreground py-2 rounded-lg text-sm transition-colors"
              >
                Export Depth PNG
              </button>
            </div>
          </div>

          {/* Processing Status */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-medium mb-3">Processing Status</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stereo Matching</span>
                <span className={hasData ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}>
                  {hasData ? '✓' : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Depth Estimation</span>
                <span className={hasData ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}>
                  {hasData ? '✓' : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Point Cloud Gen</span>
                <span className={hasData ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}>
                  {hasData ? '✓' : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
