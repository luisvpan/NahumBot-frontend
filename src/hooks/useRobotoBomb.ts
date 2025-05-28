import { useMemo, useState } from "react";

export default function useRobotoBomb(): RobotoBombHook {
  const [bombMode, setBombMode] = useState<BombModeEnum | null>(null);

  const robotoBombMode = useMemo(() => {
    return bombMode;
  }, [bombMode]);

  return {
    robotoBombMode,
    setBombMode,
  };
}

export enum BombModeEnum {
  NONE = "none",
  EMPTY = "empty",
  FILL = "fill",
}

export interface RobotoBombHook {
  robotoBombMode: BombModeEnum | null;
  setBombMode: (bombMode: BombModeEnum) => void;
}
