import { Dispatch, SetStateAction, useMemo, useState } from "react";

export const UCAB_GUAYANA_LOCATION = {
  //Direction UCAB Guayana
  latitude: 8.297190438715472,
  longitude: -62.71175014484465,
};

export default function useRobotoLocation(): RobotoLocationHook {
  const [coordinates, setCoordinates] = useState<CoordinatesI | null>(null);
  const [altitudeInMetters] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [orientation, setOrientation] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);

  const robotoLocation = useMemo(() => {
    return {
      coordinates,
      heading,
      altitudeInMetters,
      direction: direction!,
      orientation,
      speed,
    };
  }, [coordinates, heading, altitudeInMetters, direction, orientation, speed]);

  return {
    robotoLocation,
    setHeading,
    setDirection,
    coordinates,
    setCoordinates,
    orientation,
    setOrientation,
    speed,
    setSpeed,
  };
}

export enum Direction {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
}
export interface CoordinatesI {
  latitude: number;
  longitude: number;
}

export interface RobotoLocation {
  coordinates: CoordinatesI | null;
  heading: number | null;
  altitudeInMetters: number | null;
  direction: Direction | null;
  orientation: number | null;
  speed: number | null;
}

export interface RobotoLocationHook {
  robotoLocation: RobotoLocation;
  setHeading: Dispatch<SetStateAction<number | null>>;
  setDirection: Dispatch<SetStateAction<Direction | null>>;
  setCoordinates: Dispatch<SetStateAction<CoordinatesI | null>>;
  coordinates: CoordinatesI | null;
  orientation: number | null;
  setOrientation: Dispatch<SetStateAction<number | null>>;
  speed: number | null;
  setSpeed: Dispatch<SetStateAction<number | null>>;
}
