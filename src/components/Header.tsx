import { Gamepad2, Zap } from 'lucide-react';
import useRobotoContext from '../hooks/useRobotoContext';

interface HeaderProps {
  turboMode?: boolean;
}

export const Header = ({ turboMode = false }: HeaderProps) => {

  const { isConnected } = useRobotoContext()

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800 rounded-lg p-4 transition-all duration-300 ${
      turboMode ? 'animate-pulse border-2 border-yellow-400' : ''
    }`}>
      <div className="flex items-center gap-3 mb-3 sm:mb-0">
        <Gamepad2 className={`w-6 h-6 md:w-8 md:h-8 ${
          turboMode ? 'text-yellow-400 animate-spin' : 'text-blue-400'
        }`} />
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          Robot Control Center
          {turboMode && (
            <span className="flex items-center gap-1 text-yellow-400">
              <Zap className="w-6 h-6 animate-pulse" />
              TURBO MODE
            </span>
          )}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full animate-pulse ${
            turboMode ? 'bg-yellow-400' : isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm md:text-base">{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </div>
      </div>
    </div>
  );
};