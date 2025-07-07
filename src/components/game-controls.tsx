import { GameControlsProps } from "@/types/types";
export default function GameControls({
  inputValue,
  inputError,
  elapsedTime,
  handleInputChange,
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 w-full">
        <label className="text-base md:text-lg font-medium text-gray-600">
          Points:
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`border rounded px-3 py-1 w-full max-w-[100px] shadow-sm text-center focus:outline-none focus:ring-2 ${
            inputError
              ? "border-red-500 ring-red-300 text-red-600"
              : "border-black focus:ring-blue-300 text-black"
          }`}
        />
        <label className="text-base md:text-lg font-medium text-gray-600">
          Time: <span className="text-blue-600">{elapsedTime.toFixed(1)}s</span>
        </label>
      </div>
      {inputError && (
        <p className="text-red-500 text-sm font-medium text-center">
          {inputError}
        </p>
      )}
    </div>
  );
}
