interface VideoFeedProps {
  turboMode?: boolean;
  streamFrame?: string | null;
}

export const VideoFeed = ({
  turboMode = false,
  streamFrame = null,
}: VideoFeedProps) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 transition-all duration-300 ${
        turboMode ? "border-2 border-yellow-400" : ""
      }`}
    >
      <div
        className={`aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden ${
          turboMode ? "animate-pulse" : ""
        }`}
      >
        {streamFrame ? (
          <img
            src={`data:image/png;base64,${streamFrame}`}
            alt="Robot camera feed"
            className={`-scale-y-100 rounded-lg w-full h-full object-cover transition-all duration-300 ${
              turboMode ? "scale-110 saturate-150 contrast-125" : ""
            }`}
          />
        ) : (
          <div>Cámara desconectada</div>
        )}
      </div>
    </div>
  );
};
