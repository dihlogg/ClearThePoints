export interface GameControlsProps {
  inputValue: string;
  inputError: string;
  elapsedTime: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GameButtonsProps {
  gameStatus: string;
  autoPlay: boolean;
  startGame: () => void;
  toggleAutoPlay: () => void;
}

export interface GameBoardProps {
  gamePoints: { id: number; x: number; y: number }[];
  handleClick: (id: number) => void;
}
