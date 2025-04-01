import {
  Navigation,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Hand,
  Dog,
  MapPinned,
  Waypoints,
} from "lucide-react";
import useRobotoContext from "../hooks/useRobotoContext";
import { MoveCommand } from "../types/MoveCommand";
import { MovementMode } from "../hooks/useRobotoStatus";

interface ControlsProps {
  onKonamiInput?: (input: string) => void;
}

export const Controls = ({ onKonamiInput }: ControlsProps) => {
  const { socket, robotoStatus } = useRobotoContext();
  const handleButtonPress = (command: MoveCommand) => {
    onKonamiInput?.(command);

    if (!socket) return;
    socket.emit("move", command);
  };

  const isDogMode = robotoStatus.movementMode === MovementMode.DOG;
  const isMapMode = robotoStatus.movementMode === MovementMode.MAP;
  const isPathMode = robotoStatus.movementMode === MovementMode.PATH;
  const isControlMode = robotoStatus.movementMode === MovementMode.CONTROL;

  const renderOverlayIcon = () => {
    if (isDogMode)
      return (
        <Dog className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-500" />
      );
    if (isMapMode)
      return (
        <MapPinned className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-500" />
      );
    if (isPathMode)
      return (
        <Waypoints className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-500" />
      );
    return null;
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 relative ${
        !isControlMode ? "overlay" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
        <h2 className="text-lg md:text-xl font-semibold">Controles de Movimiento</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 align-center place-items-center">
        <div></div>

        <button
          onClick={() => handleButtonPress(MoveCommand.Forward)}
          className={`bg-gray-700 hover:bg-gray-600  w-[90px] h-[90px] rounded-lg transition-colors active:bg-gray-500 touch-manipulation ${
            !isControlMode ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isControlMode}
        >
          <ChevronUp className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
        </button>

        <div></div>
        <button
          onClick={() => handleButtonPress(MoveCommand.TurnLeft)}
          className={`bg-gray-700 hover:bg-gray-600 w-[90px] h-[90px] rounded-lg transition-colors active:bg-gray-500 touch-manipulation ${
            !isControlMode ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isControlMode}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
        </button>
        <button
          onClick={() => handleButtonPress(MoveCommand.Stop)}
          className={`bg-gray-700 hover:bg-gray-600 w-[90px] h-[90px] rounded-lg transition-colors active:bg-gray-500 touch-manipulation ${
            !isControlMode ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isControlMode}
        >
          <Hand className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
        </button>

        <button
          onClick={() => handleButtonPress(MoveCommand.TurnRight)}
          className={`bg-gray-700 hover:bg-gray-600 w-[90px] h-[90px] rounded-lg transition-colors active:bg-gray-500 touch-manipulation ${
            !isControlMode ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isControlMode}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
        </button>
        <div></div>
        <button
          onClick={() => handleButtonPress(MoveCommand.Backward)}
          className={`bg-gray-700 hover:bg-gray-600 w-[90px] h-[90px] rounded-lg transition-colors active:bg-gray-500 touch-manipulation ${
            !isControlMode ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isControlMode}
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
        </button>
      </div>

      {!isControlMode && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          {renderOverlayIcon()}
        </div>
      )}
    </div>
  );
};
