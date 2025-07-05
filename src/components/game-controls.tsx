import { GameControlsProps } from "@/types/types";
export default function GameControls({
  inputValue,
  inputError,
  elapsedTime,
  handleInputChange,
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-6">
        <label className="text-lg font-medium text-gray-600">Points:</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`border rounded px-3 py-1 w-24 shadow-sm focus:outline-none focus:ring-2 ${
            inputError
              ? "border-red-500 ring-red-300 text-red-600"
              : "border-black focus:ring-blue-300 text-black"
          }`}
        />
        <label className="text-lg font-medium text-gray-600">
          Time: <span className="text-blue-600">{elapsedTime.toFixed(1)}s</span>
        </label>
      </div>
      {inputError && (
        <p className="text-red-500 text-sm font-medium">{inputError}</p>
      )}
    </div>
  );
}
