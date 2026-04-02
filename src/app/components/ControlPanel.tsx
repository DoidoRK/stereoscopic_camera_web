import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface ControlPanelProps {
  activeKeys: Set<string>;
}

export function ControlPanel({ activeKeys }: ControlPanelProps) {
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
        <div className="text-xs text-muted-foreground font-mono">
          {keyName}
        </div>
      </div>
    );
  };


  
  return (
    <div className="bg-card rounded-lg p-2 border border-border">
      <h3 className="font-medium mb-4">Movement Controls</h3>
      
      <div className="flex flex-col items-center">
        <div className="flex gap-2 justify-center">
          <KeyButton keyName="W" direction="forward" icon={ArrowUp} />
        </div>
        <div className="flex gap-2 justify-center">
          <KeyButton keyName="A" direction="left" icon={ArrowLeft} />
          <KeyButton keyName="S" direction="backward" icon={ArrowDown} />
          <KeyButton keyName="D" direction="right" icon={ArrowRight} />
        </div>
      </div>
    </div>
  );
}