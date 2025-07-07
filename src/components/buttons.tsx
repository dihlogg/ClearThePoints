import { GameButtonsProps } from "@/types/types";
export default function GameButtons({
  gameStatus,
  autoPlay,
  startGame,
  toggleAutoPlay,
}: GameButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer transition-colors w-full sm:w-auto"
        onClick={startGame}
      >
        {gameStatus === "idle" || gameStatus !== "playing" ? "Play" : "Restart"}
      </button>
      {gameStatus === "playing" && (
        <button
          className={`${
            autoPlay ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
          } text-white font-semibold px-6 py-2 rounded shadow cursor-pointer transition-colors w-full sm:w-auto`}
          onClick={toggleAutoPlay}
        >
          Auto Play {autoPlay ? "On" : "Off"}
        </button>
      )}
    </div>
  );
}
