import { FC } from 'react';
import { Vertex, CellType } from '../utils/types';

interface GridProps {
  grid: Vertex[][];
  onCellClick: (row: number, col: number) => void;
}

const Grid: FC<GridProps> = ({ grid, onCellClick }) => {
  const getCellClassName = (cell: Vertex) => {
    const base = 'transition-all duration-300 rounded-sm shadow-inner ';
    const styleByType = {
      [CellType.Source]: 'bg-emerald-500 hover:bg-emerald-400',
      [CellType.Destination]: 'bg-rose-500 hover:bg-rose-400',
      [CellType.Wall]: 'bg-slate-800 hover:bg-slate-700',
      [CellType.Visited]: 'bg-indigo-400 animate-fade-in',
      [CellType.Path]: 'bg-amber-400 animate-pulse',
      [CellType.Empty]: 'bg-slate-100 hover:bg-slate-200',
    };
    return base + (styleByType[cell.type] || styleByType[CellType.Empty]);
  };

  return (
    <div className="w-full h-full max-w-full max-h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-2">
      <div 
        className="grid h-full gap-0.5"
        style={{ 
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClassName(cell)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              role="button"
              tabIndex={0}
              aria-label={`Cell ${rowIndex},${colIndex} - ${cell.type}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;