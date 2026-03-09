import { SensorReadings } from '../../types';

interface AccelerometerPanelProps {
  sensorReadings: SensorReadings;
}

export function AccelerometerPanel({ sensorReadings }: AccelerometerPanelProps) {
  const stats = [
    {label: "Accelerometer X", value: sensorReadings.accelerometerXReading},
    {label: "Accelerometer Y", value: sensorReadings.accelerometerYReading},
    {label: "Accelerometer Z", value: sensorReadings.accelerometerZReading},
  ];

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Accelerometer Data</h3>
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