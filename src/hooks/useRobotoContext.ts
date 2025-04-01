import { useContext } from "react";
import RobotoContext from "../context/RobotoContext";

export default function useRobotoContext() {
  return useContext(RobotoContext);
}
