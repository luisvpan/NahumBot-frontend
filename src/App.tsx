import { useEffect } from "react";
import { Header } from "./components/Header";
import { VideoFeed } from "./components/VideoFeed";
import { Controls } from "./components/Controls";
import { GPSInfo } from "./components/GPSInfo";
import useRobotoContext from "./hooks/useRobotoContext";
import { ControlMode } from "./components/ControlMode";
import { Text } from "lucide-react";

export default function App() {
  const {
    konamiActivated,
    addToSequence,
    streamFrame,
    socket,
    setStreamFrame,
    setCoordinates,
    setDirection,
    setHeading,
    setOrientation,
    setSpeed,
    changeRobotoStatus,
    setSensorHistory,
    sensorHistory,
  } = useRobotoContext();

  const handleButtonPress = () => {
    if (!socket) return;
    socket.emit("sensors");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-video-stream", (data) => {
      setStreamFrame(data);
    });
    socket.on("receive-gps-update", (data) => {
      setCoordinates(data);
    });
    socket.on("receive-gps-speed", (data) => {
      setSpeed(data);
    });
    socket.on("receive-gps-orientation", (data) => {
      setOrientation(data);
    });
    socket.on("receive-direction", (data) => {
      setDirection(data);
    });
    socket.on("receive-heading", (data) => {
      setHeading(data);
    });
    socket.on("receive-current-status", (data) => {
      changeRobotoStatus(data);
    });
    socket.on("receive-current-sensors", (data) => {
      setSensorHistory([
        { tds: data.tds, turbidez: data.turbidez },
        ...sensorHistory,
      ]);
    });
  }, [
    changeRobotoStatus,
    setCoordinates,
    setDirection,
    setHeading,
    setOrientation,
    setSpeed,
    setStreamFrame,
    socket,
    setSensorHistory,
    sensorHistory,
  ]);

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white p-4 md:p-6 transition-all duration-300 ${
        konamiActivated ? "turbo-mode" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <Header turboMode={konamiActivated} />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[4fr_2fr] gap-4">
            <VideoFeed turboMode={konamiActivated} streamFrame={streamFrame} />
            <GPSInfo />
          </div>

          <div className="grid grid-cols-[2fr_1fr_4fr] gap-4">
            <Controls onKonamiInput={addToSequence} />
            <ControlMode />
            <div
              className={`bg-gray-800 rounded-lg p-4 flex flex-col px-4 py-4`}
            >
              <div className="flex justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Text className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  <h2 className="text-lg md:text-xl font-semibold">
                    Historial de operaciones
                  </h2>
                </div>

                <button
                  className="bg-blue-500 py-2 px-2 rounded-lg"
                  onClick={handleButtonPress}
                >
                  Obtener Muestra
                </button>
              </div>

              <div className="flex flex-col border-solid border-2 border-gray-900 h-full max-h-80 rounded-lg gap-3 overflow-y-auto py-4 px-4 ">
                {sensorHistory.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 gap-4 bg-gray-700 rounded-lg items-center"
                  >
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Turbidez</h3>
                      <h2 className="text-xl font-semibold">
                        {item.turbidez.toFixed(2)}
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">
                        Sólidos disueltos
                      </h3>
                      <h2 className="text-xl font-semibold">
                        {item.tds.toFixed(2)} ppm
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">pH</h3>
                      <h2 className="text-xl font-semibold">6.2</h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Temperatura</h3>
                      <h2 className="text-xl font-semibold">32 C°</h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Latitud</h3>
                      <h2 className="text-xl font-semibold">23 {"° N"}</h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Longitud</h3>
                      <h2 className="text-xl font-semibold">20 {"° W"}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
