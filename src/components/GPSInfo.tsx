import { Compass } from "lucide-react";
import { MapComponent } from "./Map";
import useRobotoContext from "../hooks/useRobotoContext";

export const GPSInfo = ({ turboMode = false }: Props) => {
  const { coordinates, robotoLocation, isConnected } = useRobotoContext();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-row mb-4 justify-between">
          <div className="flex items-center gap-2 ">
            <Compass className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            <h2 className="text-lg md:text-xl font-semibold">GPS</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  turboMode
                    ? "bg-yellow-400"
                    : isConnected
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm md:text-base">
                {isConnected ? "Conectado" : "Desconectado"}
              </span>
            </div>
          </div>
        </div>

        <MapComponent />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-3 md:gap-4">
          {coordinates ? (
            <>
              <div className="bg-gray-700 rounded-lg p-3 md:p-4">
                <div className="text-xs md:text-sm text-gray-400">Latitud</div>
                <div className="text-base md:text-lg font-semibold">
                  {coordinates.latitude.toFixed(5) + "° N"}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-3 md:p-4">
                <div className="text-xs md:text-sm text-gray-400">Longitud</div>
                <div className="text-base md:text-lg font-semibold">
                  {coordinates.longitude.toFixed(5) + "° W"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-700 rounded-lg p-3 md:p-4">
                <div className="text-xs md:text-sm text-gray-400">Latitud</div>
                <div className="text-base md:text-lg font-semibold">N/A</div>
              </div>

              <div className="bg-gray-700 rounded-lg p-3 md:p-4">
                <div className="text-xs md:text-sm text-gray-400">Longitud</div>
                <div className="text-base md:text-lg font-semibold">N/A</div>
              </div>
            </>
          )}
          <div className="bg-gray-700 rounded-lg p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-400">Orientación</div>
            <div className="text-base md:text-lg font-semibold">
              {robotoLocation.orientation
                ? robotoLocation.orientation.toFixed(2) + "°"
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Props {
  turboMode?: boolean;
}
