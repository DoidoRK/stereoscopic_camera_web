import { EncodersData } from '../../types';

interface EncodersPanelProps {
  encodersData: EncodersData;
}

export function EncodersPanel({ encodersData }: EncodersPanelProps) {
  const stats = [
    { label: 'Front Left Motor', value: encodersData.frontLeftMotorEncoderReading},
    { label: 'Front Right Motor', value: encodersData.frontRightMotorEncoderReading},
    { label: 'Rear Left Motor', value: encodersData.rearLeftMotorEncoderReading},
    { label: 'Rear Right Motor', value: encodersData.rearRightMotorEncoderReading},
  ];

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Encoders Data</h3>
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