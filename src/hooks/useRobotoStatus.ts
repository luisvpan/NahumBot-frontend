import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

export default function useRobotoLocation(): RobotoStatusHook {
  const [running, setRunning] = useState<boolean>(false);
  const [movementMode, setMovementMode] = useState<MovementMode>(
    MovementMode.CONTROL
  );
  const [movementSpeed, setMovementSpeed] = useState<number>(0);
  const [waterBombIsOn, setWaterBombIsOn] = useState<boolean>(false);

  const changeRobotoStatus = useCallback((status: RobotoStatus) => {
    setMovementMode(status.movementMode);
    setRunning(status.running);
    setMovementSpeed(status.movementSpeed);
    setWaterBombIsOn(status.waterBombIsOn);
  }, []);

  const robotoStatus = useMemo(() => {
    return {
      running,
      movementMode,
      movementSpeed,
      waterBombIsOn,
    };
  }, [running, movementMode, movementSpeed, waterBombIsOn]);

  return {
    robotoStatus,
    changeRobotoStatus,
    setMovementMode,
    setMovementSpeed,
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
  waterBombIsOn: boolean;
}

export interface RobotoStatusHook {
  changeRobotoStatus: (status: RobotoStatus) => void;
  robotoStatus: RobotoStatus;
  setMovementMode: Dispatch<SetStateAction<MovementMode>>;
  setMovementSpeed: Dispatch<SetStateAction<number>>;
}
