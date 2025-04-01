import { Dispatch, SetStateAction, useMemo, useState } from "react";

export default function useRobotoSensors(): RobotoSensorsHook {
  const [tds, setTds] = useState<number | null>(null);
  const [turbidez, setTurbidez] = useState<number | null>(null);
  const [sensorHistory, setSensorHistory] = useState<
    { tds: number; turbidez: number }[]
  >([]);
  const robotoSensors = useMemo(() => {
    return {
      turbidez,
      tds,
      sensorHistory,
    };
  }, [turbidez, tds, sensorHistory]);

  return {
    robotoSensors,
    turbidez,
    tds,
    setTds,
    setTurbidez,
    sensorHistory,
    setSensorHistory,
  };
}

export interface RobotoSensors {
  tds: number | null;
  turbidez: number | null;
}

export interface RobotoSensorsHook {
  robotoSensors: RobotoSensors;
  turbidez: number | null;
  tds: number | null;
  setTds: Dispatch<SetStateAction<number | null>>;
  setTurbidez: Dispatch<SetStateAction<number | null>>;
  sensorHistory: { tds: number; turbidez: number }[];
  setSensorHistory: Dispatch<
    SetStateAction<{ tds: number; turbidez: number }[]>
  >;
}
