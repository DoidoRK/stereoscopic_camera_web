import { Camera, Gamepad2, Box, LucideIcon, Save, Sun, Moon } from 'lucide-react';
import { ControlMode } from '../../types';

interface SidebarProps {
  currentMode: ControlMode;
  onModeChange: (mode: ControlMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

interface ModeButtonProps {
  icon: LucideIcon;
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function ModeButton({ icon: Icon, label, description, isActive, onClick }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-all
        ${isActive 
          ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20' 
          : 'bg-secondary border-border hover:bg-accent hover:border-primary/50'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-lg
          ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className={`font-medium mb-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>
            {label}
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
}

export function Sidebar({ currentMode, onModeChange, isDark, toggleTheme }: SidebarProps) {
  const modes: Array<{ id: ControlMode; icon: LucideIcon; label: string; description: string }> = [
    {
      id: 'control',
      icon: Gamepad2,
      label: 'Rover Control',
      description: 'Control robot movement with live camera feed'
    },
    {
      id: 'savePictures',
      icon: Save,
      label: 'Save Pictures Mode',
      description: 'Calibrate stereoscopic camera alignment and parameters'
    },
    {
      id: 'calibration',
      icon: Camera,
      label: 'Calibration Mode',
      description: 'Calibrate stereoscopic camera alignment and parameters'
    },
    {
      id: 'depth',
      icon: Box,
      label: 'Depth & Point Cloud',
      description: 'Generate and view 3D depth maps and point clouds'
    }
  ];

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-sidebar-foreground">Control Modes</h2>
          <p className="text-xs text-muted-foreground">Select an operation mode</p>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {/* Sun */}
          <Sun
            className={`
              absolute w-5 h-5 transition-all duration-300 ease-in-out
              ${isDark 
                ? 'rotate-90 scale-0 opacity-0' 
                : 'rotate-0 scale-100 opacity-100'}
            `}
          />

          {/* Moon */}
          <Moon
            className={`
              absolute w-5 h-5 transition-all duration-300 ease-in-out
              ${isDark 
                ? 'rotate-0 scale-100 opacity-100' 
                : '-rotate-90 scale-0 opacity-0'}
            `}
          />
        </button>
      </div>

      {/* MODES */}
      <div className="space-y-3 flex-1">
        {modes.map((mode) => (
          <ModeButton
            key={mode.id}
            icon={mode.icon}
            label={mode.label}
            description={mode.description}
            isActive={currentMode === mode.id}
            onClick={() => onModeChange(mode.id)}
          />
        ))}
      </div>
    </div>
  );
}