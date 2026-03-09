import { useState, useEffect, useCallback } from 'react';
import { ControlPanel } from '../ControlPanel';
import { StatusPanel } from '../StatusPanel';
import { EncodersPanel } from '../EncodersPanel';
import { AccelerometerPanel } from '../AccelerometerPanel';
import { GyroscopePanel } from '../GyroscopePanel';

import { Video } from 'lucide-react';
import useSystemSimulation from '../../useSystemSimulation';

export function RoverControlMode() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const {
    systemData
  } = useSystemSimulation();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
      e.preventDefault();
      setActiveKeys(prev => new Set(prev).add(key));
      // sendRobotCommand(key, 'press');
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
      // sendRobotCommand(key, 'release');
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

  return (
    <div className="flex-1 p-6">
      {/* Stereo Camera Feed - Full Width */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Stereoscopic Camera View</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left Camera */}
          <div className="space-y-2">
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              {systemData.miscellaneousData.leftCameraConnected? 
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  color: 'var(--color-foreground)'
                }} />
              :
                <div className="absolute px-2 py-1 rounded text-xs text-white font-mono">
                  Waiting for left camera to connect
                </div>
              }
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                LEFT
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                FPS: {systemData.miscellaneousData.leftCameraFPS.toPrecision(4)}
              </div>
              
              <Video className="w-16 h-16 text-muted-foreground" />
            </div>
          </div>

          {/* Right Camera */}
          <div className="space-y-2">
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              {systemData.miscellaneousData.rightCameraConnected? 
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  color: 'var(--color-foreground)'
                }} />
              :
                <div className="absolute px-2 py-1 rounded text-xs text-white font-mono">
                  Waiting for right camera to connect
                </div>
              }
              
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                RIGHT
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
                FPS: {systemData.miscellaneousData.rightCameraFPS.toPrecision(4)}
              </div>
              
              <Video className="w-16 h-16 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Status - Below Camera */}
      <div className="grid grid-rows-2 gap-4">
        <div className="grid grid-cols-4 gap-4">
          <StatusPanel miscellaneousData={systemData.miscellaneousData}/>
          <EncodersPanel encodersData={systemData.encodersData}/>
          <GyroscopePanel gyroscopeData={systemData.gyroscopeData}/>
          <AccelerometerPanel accelerometerData={systemData.accelerometerData}/>
        </div>
          <ControlPanel activeKeys={activeKeys} />
      </div>
    </div>
  );
}