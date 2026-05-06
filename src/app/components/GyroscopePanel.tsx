import { GyroscopeData } from '../../types';

interface GyroscopePanelProps {
  gyroscopeData: GyroscopeData;
}

export function GyroscopePanel({ gyroscopeData }: GyroscopePanelProps) {
  const stats = [
    {label: "X Axis", value: gyroscopeData.gyroscopeXReading},
    {label: "Y Axis", value: gyroscopeData.gyroscopeYReading},
    {label: "Z Axis", value: gyroscopeData.gyroscopeZReading},
  ];

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Gyroscope Data</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-lg font-mono">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}