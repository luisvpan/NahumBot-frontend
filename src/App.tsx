import { useEffect } from "react";
import { Header } from "./components/Header";
import { VideoFeed } from "./components/VideoFeed";
import { Controls } from "./components/Controls";
import { GPSInfo } from "./components/GPSInfo";
import useRobotoContext from "./hooks/useRobotoContext";

import { Text } from "lucide-react";
import { BombModeEnum } from "./hooks/useRobotoBomb";

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
    setBombMode,
    robotoStatus,
    coordinates,
  } = useRobotoContext();

  const { bombMode } = robotoStatus;
  const handleButtonPress = () => {
    if (!socket) return;
    socket.emit("sensors");
  };

  const handleFillingBombToggle = () => {
    console.log("Llenando...");
    if (!socket) return;
    if (robotoStatus.bombMode === BombModeEnum.FILL) {
      socket.emit("change-water-bomb-mode", BombModeEnum.NONE);
    } else {
      socket.emit("change-water-bomb-mode", BombModeEnum.FILL);
    }
  };

  const handleEmptyBombToggle = () => {
    console.log("Vaciando...");
    if (!socket) return;
    if (robotoStatus.bombMode === BombModeEnum.EMPTY) {
      socket.emit("change-water-bomb-mode", BombModeEnum.NONE);
    } else {
      socket.emit("change-water-bomb-mode", BombModeEnum.EMPTY);
    }
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
      console.log(data);
      changeRobotoStatus(data);
    });
    socket.on("receive-water-bomb-status", (data) => {
      console.log(data);
      setBombMode(data);
    });
    socket.on("receive-current-sensors", (data) => {
      console.log(data);
      setSensorHistory([
        {
          tds: data.tds,
          turbidez: data.turbidez,
          ph: data.ph,
          temperaturaAfuera: data.temperaturaMuestra,
          temperaturaSumergido: data.temperaturaSumergido,
          rayosUV: data.rayosUV,
          latitud: coordinates ? coordinates!.latitude : 0,
          longitud: coordinates ? coordinates!.longitude : 0,
        },
        ...sensorHistory,
      ]);
    });
  }, [
    coordinates,
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
    setBombMode,
  ]);
  return (
    <div
      className={`min-h-screen bg-gray-900 text-white p-4 md:p-6 transition-all duration-300 ${
        konamiActivated ? "turbo-mode" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[4fr_2fr] gap-4">
            <VideoFeed turboMode={konamiActivated} streamFrame={streamFrame} />
            <GPSInfo />
          </div>

          <div className="grid grid-cols-[2fr_5fr] gap-4">
            <Controls onKonamiInput={addToSequence} />
            <div
              className={`bg-gray-800 rounded-lg p-4 flex flex-col px-4 py-4`}
            >
              <div className="flex justify-between mb-4 items-center">
                <div className="flex items-center gap-2">
                  <Text className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  <h2 className="text-lg font-semibold">
                    Historial de operaciones
                  </h2>
                </div>

                <p className="text-center text-sm">
                  Modo de Bomba:{" "}
                  <span className="text-md font-semibold">
                    {bombMode === BombModeEnum.EMPTY && "Vaciar"}
                    {bombMode === BombModeEnum.FILL && "Llenar"}
                    {bombMode === BombModeEnum.NONE && "Ninguno"}
                  </span>
                </p>
                <div className="flex gap-4 items-center">
                  <button
                    className={"py-2 px-2 rounded-lg text-sm"}
                    style={{
                      backgroundColor:
                        bombMode === BombModeEnum.FILL ? "#3A6FC4" : "#3B82F6",
                    }}
                    onClick={handleFillingBombToggle}
                  >
                    Llenar Muestra
                  </button>
                  <button
                    className="py-2 px-2 rounded-lg text-sm"
                    style={{
                      backgroundColor:
                        bombMode === BombModeEnum.EMPTY ? "#3A6FC4" : "#3B82F6",
                    }}
                    onClick={handleEmptyBombToggle}
                  >
                    Vaciar Muestra
                  </button>
                  <button
                    className="bg-blue-500 py-2 px-2 rounded-lg text-sm"
                    onClick={handleButtonPress}
                  >
                    Tomar Medidas
                  </button>
                </div>
              </div>

              <div className="flex flex-col border-solid border-2 border-gray-900 h-full max-h-80 rounded-lg gap-3 overflow-y-auto py-4 px-4 ">
                {sensorHistory.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 gap-4 bg-gray-700 rounded-lg items-center"
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
                      <h2 className="text-xl font-semibold">
                        {item.ph.toFixed(2)}
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">
                        Temperatura de la muestra
                      </h3>
                      <h2 className="text-xl font-semibold">
                        {item.temperaturaAfuera.toFixed(2)} C°
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">
                        Temperatura sumergido
                      </h3>
                      <h2 className="text-xl font-semibold">
                        {item.temperaturaSumergido.toFixed(2)} C°
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Rayos UV</h3>
                      <h2 className="text-xl font-semibold">
                        {(item.rayosUV / 10).toFixed(2)} IUV
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Latitud</h3>
                      <h2 className="text-xl font-semibold">
                        {item.latitud.toFixed(5) + "° N"}
                      </h2>
                    </div>
                    <div className="text-center py-3">
                      <h3 className="text-base text-gray-400">Longitud</h3>
                      <h2 className="text-xl font-semibold">
                        {item.longitud.toFixed(5) + "° W"}
                      </h2>
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
