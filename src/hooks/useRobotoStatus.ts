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

  const changeRobotoStatus = useCallback((status: RobotoStatus) => {
    setMovementMode(status.movementMode);
    setRunning(status.running);
    setMovementSpeed(status.movementSpeed);
  }, []);

  const robotoStatus = useMemo(() => {
    return {
      running,
      movementMode,
      movementSpeed,
    };
  }, [running, movementMode, movementSpeed]);

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
}

export interface RobotoStatusHook {
  changeRobotoStatus: (status: RobotoStatus) => void;
  robotoStatus: RobotoStatus;
  setMovementMode: Dispatch<SetStateAction<MovementMode>>;
  setMovementSpeed: Dispatch<SetStateAction<number>>;
}
