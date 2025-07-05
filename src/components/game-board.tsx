import { GameBoardProps } from "@/types/types";
export default function GameBoard({ gamePoints, handleClick }: GameBoardProps) {
  return (
    <div className="relative w-[520px] h-[520px] border-2 border-blue-200 bg-white rounded-md mx-auto shadow-inner">
      {gamePoints.map((point) => (
        <div
          key={point.id}
          onClick={() => handleClick(point.id)}
          className="absolute bg-blue-100 hover:bg-blue-300 text-blue-700 border border-blue-400 font-bold rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-sm transition"
          style={{ left: point.x, top: point.y }}
        >
          {point.id}
        </div>
      ))}
    </div>
  );
}