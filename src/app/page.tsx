"use client";

import { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { GiTargetArrows } from "react-icons/gi";
import GameHeader from "@/components/header";
import GameControls from "@/components/game-controls";
import GameButtons from "@/components/buttons";
import GameBoard from "@/components/game-board";

export default function ClearPointsGame() {
  const [points, setPoints] = useState(10);
  const [gamePoints, setGamePoints] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [inputPoints, setInputPoints] = useState(10);
  const [inputValue, setInputValue] = useState("10");
  const [inputError, setInputError] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(1);

  useEffect(() => {
    if (gameStatus === "playing") {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => parseFloat((prev + 0.1).toFixed(1)));
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  const startGame = () => {
    setAutoPlay(false);
    clearInterval(autoPlayRef.current!);

    setGamePoints(
      Array.from({ length: inputPoints }, (_, i) => ({
        id: i + 1,
        x: Math.random() * 280,
        y: Math.random() * 280,
      }))
    );

    currentIndexRef.current = 1;
    setElapsedTime(0);
    setGameStatus("playing");
  };

  const handleClick = (id: number) => {
    if (gameStatus !== "playing" || autoPlay) return;
    handlePointClick(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const num = Number(value);

    if (value.trim() === "" || isNaN(num)) {
      setInputError("Please enter a number between 1 and 1000.");
      return;
    }

    if (num < 1 || num > 1000) {
      setInputError("Value must be between 1 and 1000.");
      return;
    }

    setInputPoints(num);
    setInputError("");
  };

  const handlePointClick = (id: number) => {
    if (id === currentIndexRef.current) {
      setGamePoints((prev) => prev.filter((p) => p.id !== id));
      currentIndexRef.current++;
      if (currentIndexRef.current > inputPoints) {
        setGameStatus("cleared");
      }
    } else {
      setGameStatus("gameover");
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => {
      const next = !prev;
      if (!next && autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return next;
    });
  };

  useEffect(() => {
    if (autoPlay && gameStatus === "playing") {
      autoPlayRef.current = setInterval(() => {
        const nextPoint = gamePoints.find(
          (p) => p.id === currentIndexRef.current
        );
        if (nextPoint) {
          handlePointClick(nextPoint.id);
        } else if (currentIndexRef.current > inputPoints) {
          if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        }
      }, 300);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, gamePoints, gameStatus]);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen rounded-md shadow-lg">
      <GameHeader gameStatus={gameStatus} />
      <GameControls
        inputValue={inputValue}
        inputError={inputError}
        elapsedTime={elapsedTime}
        handleInputChange={handleInputChange}
      />
      <GameButtons
        gameStatus={gameStatus}
        autoPlay={autoPlay}
        startGame={startGame}
        toggleAutoPlay={toggleAutoPlay}
      />
      <GameBoard gamePoints={gamePoints} handleClick={handleClick} />
    </div>
  );
}
