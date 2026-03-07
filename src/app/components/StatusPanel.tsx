import { Cpu, Wifi, Battery, Thermometer } from 'lucide-react';

interface StatusPanelProps {
  isConnected: boolean;
}

export function StatusPanel({ isConnected }: StatusPanelProps) {
  const stats = [
    { icon: Wifi, label: 'Signal', value: '95%', color: 'text-green-600 dark:text-green-500' },
    { icon: Battery, label: 'Battery', value: '78%', color: 'text-primary' },
    { icon: Cpu, label: 'CPU', value: '42%', color: 'text-yellow-600 dark:text-yellow-500' },
    { icon: Thermometer, label: 'Temp', value: '45°C', color: 'text-orange-600 dark:text-orange-500' },
  ];

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Robot Status</h3>
        <div className={`
          flex items-center gap-2 text-xs px-2 py-1 rounded-full
          ${isConnected ? 'bg-green-600/20 dark:bg-green-500/20 text-green-600 dark:text-green-500' : 'bg-red-600/20 dark:bg-red-500/20 text-red-600 dark:text-red-500'}
        `}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-600 dark:bg-green-500 animate-pulse' : 'bg-red-600 dark:bg-red-500'}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-lg font-mono">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}