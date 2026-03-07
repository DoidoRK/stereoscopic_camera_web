import { Video, VideoOff } from 'lucide-react';
import { useState } from 'react';

interface CameraFeedProps {
  cameraId: number;
  title: string;
}

export function CameraFeed({ cameraId, title }: CameraFeedProps) {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-1.5 text-green-500 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-500 text-xs">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Offline</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        {isConnected ? (
          <>
            {/* Simulated camera feed with grid pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            
            {/* Camera info overlay */}
            <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white font-mono">
              CAM-{cameraId}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white font-mono">
              {new Date().toLocaleTimeString()}
            </div>
            
            <Video className="w-12 h-12 text-gray-600" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <VideoOff className="w-12 h-12" />
            <span className="text-sm">No Signal</span>
          </div>
        )}
      </div>
    </div>
  );
}
