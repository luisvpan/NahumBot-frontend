import { Dispatch, SetStateAction, useMemo, useState } from "react";

export default function useRobotoSensors(): RobotoSensorsHook {
  const [tds, setTds] = useState<number | null>(null);
  const [turbidez, setTurbidez] = useState<number | null>(null);
  const [ph, setPh] = useState<number | null>(null);
  const [temperaturaAfuera, setTemperaturaAfuera] = useState<number | null>(
    null
  );
  const [temperaturaSumergido, setTemperaturaSumergido] = useState<
    number | null
  >(null);
  const [rayosUV, setRayosUV] = useState<number | null>(null);
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [sensorHistory, setSensorHistory] = useState<
    {
      tds: number;
      turbidez: number;
      ph: number;
      temperaturaAfuera: number;
      temperaturaSumergido: number;
      rayosUV: number;
      latitud: number;
      longitud: number;
    }[]
  >([]);

  const robotoSensors = useMemo(() => {
    return {
      turbidez,
      tds,
      ph,
      temperaturaAfuera,
      temperaturaSumergido,
      rayosUV,
      latitud,
      longitud,
      sensorHistory,
    };
  }, [
    turbidez,
    tds,
    ph,
    temperaturaAfuera,
    temperaturaSumergido,
    rayosUV,
    latitud,
    longitud,
    sensorHistory,
  ]);
  
  return {
    robotoSensors,
    turbidez,
    tds,
    ph,
    setTds,
    setTurbidez,
    setPh,
    sensorHistory,
    setSensorHistory,
    temperaturaAfuera,
    setTemperaturaAfuera,
    temperaturaSumergido,
    setTemperaturaSumergido,
    rayosUV,
    setRayosUV,
    latitud,
    setLatitud,
    longitud,
    setLongitud,
  };
}

export interface RobotoSensors {
  tds: number | null;
  turbidez: number | null;
  ph: number | null;
  temperaturaAfuera: number | null;
  temperaturaSumergido: number | null;
  rayosUV: number | null;
  latitud: number | null;
  longitud: number | null;
}

export interface RobotoSensorsHook {
  robotoSensors: RobotoSensors;
  turbidez: number | null;
  tds: number | null;
  ph: number | null;
  setTds: Dispatch<SetStateAction<number | null>>;
  setTurbidez: Dispatch<SetStateAction<number | null>>;
  setPh: Dispatch<SetStateAction<number | null>>;
  sensorHistory: {
    tds: number;
    turbidez: number;
    ph: number;
    temperaturaAfuera: number;
    temperaturaSumergido: number;
    rayosUV: number;
    latitud: number;
    longitud: number;
  }[];
  setSensorHistory: Dispatch<
    SetStateAction<
      {
        tds: number;
        turbidez: number;
        ph: number;
        temperaturaAfuera: number;
        temperaturaSumergido: number;
        rayosUV: number;
        latitud: number;
        longitud: number;
      }[]
    >
  >;
  temperaturaAfuera: number | null;
  setTemperaturaAfuera: Dispatch<SetStateAction<number | null>>;
  temperaturaSumergido: number | null;
  setTemperaturaSumergido: Dispatch<SetStateAction<number | null>>;
  rayosUV: number | null;
  setRayosUV: Dispatch<SetStateAction<number | null>>;
  latitud: number | null;
  setLatitud: Dispatch<SetStateAction<number | null>>;
  longitud: number | null;
  setLongitud: Dispatch<SetStateAction<number | null>>;
}
