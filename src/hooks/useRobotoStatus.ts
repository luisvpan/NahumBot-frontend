import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BombModeEnum } from "./useRobotoBomb";

export default function useRobotoLocation(): RobotoStatusHook {
  const [running, setRunning] = useState<boolean>(false);
  const [movementMode, setMovementMode] = useState<MovementMode>(
    MovementMode.CONTROL
  );
  const [movementSpeed, setMovementSpeed] = useState<number>(0);
  const [bombMode, setBombMode] = useState<BombModeEnum>(BombModeEnum.NONE);

  const changeRobotoStatus = useCallback((status: RobotoStatus) => {
    console.log(status);
    setMovementMode(status.movementMode);
    setRunning(status.running);
    setMovementSpeed(status.movementSpeed);
    setBombMode(status.bombMode);
  }, []);

  const robotoStatus = useMemo(() => {
    return {
      running,
      movementMode,
      movementSpeed,
      bombMode,
    };
  }, [running, movementMode, movementSpeed, bombMode]);

  return {
    robotoStatus,
    changeRobotoStatus,
    setMovementMode,
    setMovementSpeed,
    setBombMode,
  };
}

export enum MovementMode {
  CONTROL = "control",
  DOG = "dog",
  MAP = "map",
  PATH = "path",
}

export interface RobotoStatus {
  movementMode: MovementMode;
  running: boolean;
  movementSpeed: number;
  bombMode: BombModeEnum;
}

export interface RobotoStatusHook {
  changeRobotoStatus: (status: RobotoStatus) => void;
  robotoStatus: RobotoStatus;
  setMovementMode: Dispatch<SetStateAction<MovementMode>>;
  setMovementSpeed: Dispatch<SetStateAction<number>>;
  setBombMode: Dispatch<SetStateAction<BombModeEnum>>;
}
