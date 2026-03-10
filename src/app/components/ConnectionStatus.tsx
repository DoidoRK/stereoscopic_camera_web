import { LoaderCircle, CheckCircle2 } from "lucide-react";

interface ConnectionStatusProps {
  controlConnected: boolean;
  videoConnected: boolean;
}

export function ConnectionStatus({
  controlConnected,
  videoConnected
}: ConnectionStatusProps) {
  const streams = [
    {
      label: "Waiting for video stream to be established...",
      connected: videoConnected
    },
    {
      label: "Waiting for control stream to be established...",
      connected: controlConnected
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {streams.map((stream, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 transition-colors duration-300 ${
            stream.connected
              ? "text-green-500"
              : "text-muted-foreground"
          }`}
        >
          {stream.connected ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <LoaderCircle className="w-5 h-5 flex-shrink-0 animate-spin" />
          )}
          <p className="text-sm">{stream.label}</p>
        </div>
      ))}
    </div>
  );
}
