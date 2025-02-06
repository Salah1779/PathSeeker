import { Clock, Network, Route } from "lucide-react"
import "../styles/card-style.css"

interface AlgorithmStatsProps {
  executionTime: number | '--'
  visitedNodes: number
  pathLength: number
}

export default function AlgorithmStats({
  executionTime ='--',
  visitedNodes = 0,
  pathLength = 0,
}: AlgorithmStatsProps) {
  return (

    <div className="stats-card w-full max-w-[230px] p-6 text-white  flex-col flex-grow sm:max-w-max bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg ">
      
      <div className="space-y-4 flex flex-grow flex-col">
        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-white/80">Execution Time</div>
            <div className="text-xl font-semibold">
              {executionTime} <span className="text-base text-white/80">ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-white/80">Visited Nodes</div>
            <div className="text-xl font-semibold">{visitedNodes}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-white/80">Path Length</div>
            <div className="text-xl font-semibold">
              {pathLength} <span className="text-base text-white/80">steps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

