import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { GiTargetArrows } from "react-icons/gi";

export default function GameHeader({ gameStatus }: { gameStatus: string }) {
  return (
    <h1 className="text-2xl font-bold text-gray-700 text-center flex items-center justify-center gap-2">
      {gameStatus === "cleared" ? (
        <>
          <FaCheckCircle className="text-green-500" />
          ALL CLEARED!
        </>
      ) : gameStatus === "gameover" ? (
        <>
          <MdCancel className="text-red-500" />
          GAME OVER
        </>
      ) : (
        <>
          <GiTargetArrows className="text-blue-500" />
          LET PLAY!
        </>
      )}
    </h1>
  );
}
