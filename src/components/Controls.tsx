import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import { Play, Shuffle, RotateCcw } from "lucide-react"
import { Algorithm, CellType } from "../utils/types"
import SegmentControl from "./SegmentControl"

interface ControlsProps {
  onGenerateMaze: () => void
  onClear: () => void
  onVisualize: () => void
  onAlgorithmChange: Dispatch<SetStateAction<Algorithm>>
  onCellTypeChange: Dispatch<SetStateAction<CellType>>
  selectedAlgorithm: Algorithm
  selectedCellType: CellType
  isVisualizing: boolean
}

const Controls: React.FC<ControlsProps> = ({
  onGenerateMaze,
  onClear,
  onVisualize,
  onAlgorithmChange,
  onCellTypeChange,
  selectedAlgorithm,
  isVisualizing,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-40">
          <select
            className="w-full px-3 py-1 bg-slate-600 text-white text-sm rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(Number(e.target.value) as Algorithm)}
            disabled={isVisualizing}
          >
            <option value={Algorithm.DFS}>Depth First Search</option>
            <option value={Algorithm.BFS}>Breadth First Search</option>
            <option value={Algorithm.DIJKSTRA}>Dijkstra's Algorithm</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <SegmentControl
          name="cellType"
          segments={[
            { value: CellType.Source, label: "Start", color: "#22c55e" },
            { value: CellType.Wall, label: "Wall", color: "#65748b" },
            { value: CellType.Destination, label: "End", color: "#ef4444" },
          ]}
          callback={(value) => onCellTypeChange(value)}
         // defaultIndex={selectedCellType}
        />
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <button
          className="flex items-center justify-center gap-1 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 transition-all duration-300 ease-in-out w-full sm:w-auto"
          onClick={onGenerateMaze}
          disabled={isVisualizing}
        >
          <Shuffle size={14} />
          <span>Generate Maze</span>
        </button>

        <button
          className="flex items-center justify-center gap-1 px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 transition-all duration-300 ease-in-out w-full sm:w-auto"
          onClick={onVisualize}
          disabled={isVisualizing}
        >
          <Play size={14} />
          <span>Visualize</span>
        </button>

        <button
          className="flex items-center justify-center gap-1 px-3 py-1 bg-slate-600 text-white text-sm rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 transition-all duration-300 ease-in-out w-full sm:w-auto"
          onClick={onClear}
          disabled={isVisualizing}
        >
          <RotateCcw size={14} />
          <span>Clear</span>
        </button>
      </div>
    </div>
  )
}

export default Controls