import { Gamepad, Bot } from "lucide-react";
import useRobotoContext from "../hooks/useRobotoContext";
import { MovementMode } from "../hooks/useRobotoStatus";

export const ControlMode = () => {
  const { socket, robotoStatus } = useRobotoContext();
  const handleButtonPress = (command: MovementMode) => {
    if (!socket) return;
    socket.emit("change-mode", command);
  };

  return (
    <div className="grid grid-rows-2 rounded-lg ">
      <div
        className={`flex flex-col items-center justify-center rounded-t-lg ${
          robotoStatus.movementMode === MovementMode.CONTROL
            ? "bg-blue-500"
            : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
        }`}
        onClick={() => handleButtonPress(MovementMode.CONTROL)}
      >
        <Gamepad className="w-14 h-14 text-white" />
        <span className="text-white">Manual</span>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded-b-lg ${
          robotoStatus.movementMode === MovementMode.DOG
            ? "bg-blue-500"
            : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
        }`}
        onClick={() => handleButtonPress(MovementMode.DOG)}
      >
        <Bot className="w-14 h-14 text-white" />
        <span className="text-white">Automático</span>
      </div>
    </div>
  );
};
