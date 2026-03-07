import { useState, useEffect, useCallback } from 'react';
import { ControlPanel } from '../ControlPanel';
import { StatusPanel } from '../StatusPanel';
import { AlertCircle, Video } from 'lucide-react';

export function RoverControlMode() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [speed, setSpeed] = useState(50);
  const [isConnected, setIsConnected] = useState(true);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
      e.preventDefault();
      setActiveKeys(prev => new Set(prev).add(key));
      sendRobotCommand(key, 'press');
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
      e.preventDefault();
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
      sendRobotCommand(key, 'release');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const sendRobotCommand = (key: string, action: 'press' | 'release') => {
    const commands: Record<string, string> = {
      'w': 'forward',
      's': 'backward',
      'a': 'left',
      'd': 'right'
    };
    
    console.log(`Robot command: ${commands[key]} - ${action}`, {
      speed: speed,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Rover Control Mode</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Control your robot with WASD keys while viewing stereoscopic camera feed
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mb-6 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-primary" />
        <p className="text-sm text-foreground">
          Use <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">W</kbd>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">A</kbd>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">S</kbd>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">D</kbd>
          keys to control the robot.
        </p>
      </div>

      {/* Stereo Camera Feed - Full Width */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Stereoscopic Camera View</h3>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left Camera */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-medium">Left Camera</div>
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                color: 'var(--color-foreground)'
              }} />
              
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                LEFT
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                {new Date().toLocaleTimeString()}
              </div>
              
              <Video className="w-16 h-16 text-muted-foreground" />
            </div>
          </div>

          {/* Right Camera */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-medium">Right Camera</div>
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-green-600/50 dark:border-green-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                color: 'var(--color-foreground)'
              }} />
              
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                RIGHT
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                {new Date().toLocaleTimeString()}
              </div>
              
              <Video className="w-16 h-16 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Status - Below Camera */}
      <div className="grid grid-cols-4 gap-4">
        <StatusPanel isConnected={isConnected} />
        <ControlPanel activeKeys={activeKeys} speed={speed} />
        
        {/* Speed Control */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-medium mb-3">Speed Adjustment</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Stop</span>
            <span>Max</span>
          </div>
        </div>

        {/* Emergency Stop */}
        <div className="bg-card rounded-lg p-4 border border-border flex items-center">
          <button 
            className="w-full bg-destructive hover:bg-destructive/90 active:bg-destructive/80 text-destructive-foreground font-semibold py-3 px-4 rounded-lg transition-colors"
            onClick={() => {
              setActiveKeys(new Set());
              console.log('Emergency stop activated!');
            }}
          >
            EMERGENCY STOP
          </button>
        </div>
      </div>
    </div>
  );
}