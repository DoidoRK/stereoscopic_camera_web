import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { CalibrationMode } from "./components/modes/CalibrationMode";
import { RoverControlMode } from "./components/modes/RoverControlMode";
import { DepthPointCloudMode } from "./components/modes/DepthPointCloudMode";
import { ConnectionStatus } from "./components/ConnectionStatus";

import { Power, Sun, Moon, LoaderCircle } from "lucide-react";

import { SystemProvider, useSystem } from "./context/SystemProvider";

function AppContent() {
  const {
    loading,
    currentMode,
    setCurrentMode,
    videoStreamSocketConnected,
    controlSocketConnected
  } = useSystem();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const renderMode = () => {
    switch (currentMode) {
      case "control":
        return <RoverControlMode />;
      case "calibration":
        return <CalibrationMode />;
      case "depth":
        return <DepthPointCloudMode />;
      default:
        return <RoverControlMode />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-12">
        <ConnectionStatus
          controlConnected={controlSocketConnected}
          videoConnected={videoStreamSocketConnected}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Power className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Robot Control Center</h1>
              <p className="text-xs text-muted-foreground">
                Stereoscopic Vision System
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
        {renderMode()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <AppContent />
    </SystemProvider>
  );
}