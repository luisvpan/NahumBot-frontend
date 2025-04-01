import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const IS_PROD = false;
const BACKEND_URL = IS_PROD ? "http://10.68.17.119:4050" : "http://localhost:4050";

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(BACKEND_URL);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
