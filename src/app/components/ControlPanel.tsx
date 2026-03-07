import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle } from 'lucide-react';

interface ControlPanelProps {
  activeKeys: Set<string>;
  speed: number;
}

export function ControlPanel({ activeKeys, speed }: ControlPanelProps) {
  const KeyButton = ({ keyName, direction, icon: Icon }: { keyName: string; direction: string; icon: any }) => {
    const isActive = activeKeys.has(keyName.toLowerCase());
    
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`
          w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all
          ${isActive 
            ? 'bg-primary border-primary shadow-lg shadow-primary/50 scale-95' 
            : 'bg-secondary border-border'
          }
        `}>
          <Icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div className="text-xs text-muted-foreground font-mono">{keyName}</div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="font-medium mb-4">Movement Controls</h3>
      
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex justify-center">
          <KeyButton keyName="W" direction="forward" icon={ArrowUp} />
        </div>
        <div className="flex gap-2 justify-center">
          <KeyButton keyName="A" direction="left" icon={ArrowLeft} />
          <KeyButton keyName="S" direction="backward" icon={ArrowDown} />
          <KeyButton keyName="D" direction="right" icon={ArrowRight} />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Speed</span>
          <span className="text-sm font-mono text-foreground">{speed}%</span>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${speed}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Circle className="w-3 h-3" />
          <span>Use WASD keys to control robot</span>
        </div>
      </div>
    </div>
  );
}