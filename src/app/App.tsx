import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { CalibrationMode } from "./components/modes/CalibrationMode";
import { RoverControlMode } from "./components/modes/RoverControlMode";
import { DepthPointCloudMode } from "./components/modes/DepthPointCloudMode";
import { ConnectionStatus } from "./components/ConnectionStatus";

import { SystemProvider, useSystem } from "./context/SystemProvider";
import { SavePicturesMode } from "./components/modes/SavePicturesMode";

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
      case "savePictures":
        return <SavePicturesMode />;
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

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isDark={isDark}
          toggleTheme={toggleTheme}
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