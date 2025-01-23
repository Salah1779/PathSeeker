import { useState, useCallback, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import { Graph, Vertex, Position, CellType, Algorithm } from './utils/types';
import { GraphInitializer, cloneGrid, clearVisitedPathCells } from './utils/helpers';

const GRID_COLS = 25;
const GRID_ROWS = 25;

const initialGrid: Graph = GraphInitializer(GRID_COLS, GRID_ROWS);

const App: React.FC = () => {
  const [grid, setGrid] = useState<Graph>(cloneGrid(initialGrid));
  const [startPos, setStartPos] = useState<Position>({ x: 1, y: 1 });
  const [endPos, setEndPos] = useState<Position>({ x: GRID_COLS - 2, y: GRID_ROWS - 2 });
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.DFS);
  const [cellType, setCellType] = useState<CellType>(CellType.Wall);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Initial grid:', grid);
  }, []);
      
  
  const updateCell = useCallback(({ x: col, y: row }: Position, type: CellType) => {
    const newGrid = cloneGrid(grid);
    newGrid.vertices[col][row].type = type;

    if (type== CellType.Source){ //change the previous source to empty
      newGrid.vertices[startPos.x][startPos.y].type = CellType.Empty;
      newGrid.vertices[col][row].distance = 'Infinity';
      newGrid.vertices[col][row].distance = 0;
    }
    else if (type== CellType.Destination) //change the previous destination to empty
      newGrid.vertices[endPos.x][endPos.y].type = CellType.Empty;

    setGrid(newGrid);
  }, [grid]);


  const handleCellClick = useCallback((col: number, row: number) => {

    if (isVisualizing) return;  // Prevent cell clicks while visualizing
    const cell = grid.vertices[col][row];
    if(cell.type === CellType.Source || cell.type === CellType.Destination) return;
    
   if(cellType === CellType.Source && cell.type === CellType.Empty){
      updateCell({ x: col , y: row }, CellType.Source);
      setStartPos({ x: col, y: row });
      
   }else if(cellType === CellType.Destination && cell.type === CellType.Empty){
      updateCell({ x: col, y: row }, CellType.Destination);
      setEndPos({ x: col, y: row });
   }
   else if(cellType === CellType.Wall)
    updateCell({ x: col, y: row }, cell.type === CellType.Wall ? CellType.Empty : CellType.Wall);


  }, [grid, isVisualizing,cellType ,updateCell]);


  const handleGenerateMaze = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8080/generateMaze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid, startPos, endPos }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const newGrid = await response.json();
      console.log( "maze generated:",newGrid);
      setGrid(newGrid);
    } catch (error: any) {
      setError(error.message);
      console.error('Error generating maze:', error);
    }
  }, [grid, startPos, endPos]);


  const handleClear = useCallback(() => {
    const temp: Graph = cloneGrid(initialGrid);

    const sourcePos: Position = { x: startPos.x, y: startPos.y };
    const destinationPos: Position = { x: endPos.x, y: endPos.y };

    temp.vertices[1][1].type = CellType.Empty;
    temp.vertices[1][1].distance = 'Infinity';

    temp.vertices[sourcePos.x][sourcePos.y].type = CellType.Source;
    temp.vertices[sourcePos.x][sourcePos.y].distance = 0;

    temp.vertices[temp.cols - 2][temp.rows - 2].type = CellType.Empty;
    temp.vertices[destinationPos.x][destinationPos.y].type = CellType.Destination;

    
    setGrid(temp);
}, [initialGrid, startPos, endPos, setGrid]);


  const handleVisualize = useCallback(async () => {
    if (isVisualizing || !grid) return; // Empêcher plusieurs visualisations
    setIsVisualizing(true);
    setError(null);
    setGrid(clearVisitedPathCells(grid));
  
    const visualizeWithState = async (grid: Graph, path: Vertex[], visited: string[]) => {
      const VISIT_DELAY = 60; // Augmentez si besoin pour plus de fluidité
      const PATH_DELAY = 100;
  
      // Visualize visited cells
      for (let i = 0; i < visited.length; i++) {
        const [col, row] = visited[i].split(',').map(Number);
        const vertex = grid.vertices[col][row];
        if (vertex && vertex.type !== CellType.Source && vertex.type !== CellType.Destination) {
          await new Promise(resolve => setTimeout(resolve, VISIT_DELAY));
          // Utilisation de batch update pour limiter les rendus
          setGrid(prevGrid => {
            const updatedGrid = cloneGrid(prevGrid);
            updatedGrid.vertices[col][row].type = CellType.Visited;
            return updatedGrid;
          });
        }
      }
  
      // Visualize path
      
      for (let i = 0; i < path.length; i++) {
        const { x: col, y: row } = path[i].position;
        const vertex = grid.vertices[col][row];
        if (vertex && vertex.type !== CellType.Source && vertex.type !== CellType.Destination) {
          await new Promise(resolve => setTimeout(resolve, PATH_DELAY));
          // Utilisation de batch update pour limiter les rendus
          setGrid(prevGrid => {
            const updatedGrid = cloneGrid(prevGrid);
            updatedGrid.vertices[col][row].type = CellType.Path;
            return updatedGrid;
          });
        }
      }
    };
  
    try {
      const response = await fetch('http://localhost:8080/visualize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid, algorithm, startPos, endPos }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const result = await response.json();
      console.log(result);
      await visualizeWithState(grid, result.path, result.visit);
    } catch (error: any) {
      setError(error.message);
      console.error('Error visualizing :', error);
    } finally {
      setIsVisualizing(false);
    }
  }, [algorithm, grid, isVisualizing, updateCell]);
  
  

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      <nav className="bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-sans">
                Pathfinding Visualizer
              </h1>
              <p className="text-sm text-gray-400 text-center sm:text-left">by @Salah.dev</p>
            </div>
            <Controls
              onGenerateMaze={handleGenerateMaze}
              onClear={handleClear}
              onVisualize={handleVisualize}
              onAlgorithmChange={setAlgorithm}
              selectedAlgorithm={algorithm}
              onCellTypeChange={setCellType}
              selectedCellType={cellType}
              isVisualizing={isVisualizing}
            />
          </div>
        </div>
      </nav>
      <main className="max-w-7xl w-[60%] mx-auto flex flex-grow overflow-hidden">
        <div className="flex-grow p-4 flex items-center justify-center">
          {error && <div className="text-red-500">{error}</div>}
          <Grid grid={grid.vertices} onCellClick={handleCellClick} />
        </div>
      </main>
    </div>
  );
}

export default App;