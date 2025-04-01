import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export default function (socket: Socket | null) {
  const [isConnected, _setIsConnected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>(null);

  const setIsConnected = useCallback((newIsConnected: boolean) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      _setIsConnected(false);
    }, 3000);

    _setIsConnected(newIsConnected);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onAny(() => {
      setIsConnected(true);
    });

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [setIsConnected, socket]);

  return isConnected;
}
