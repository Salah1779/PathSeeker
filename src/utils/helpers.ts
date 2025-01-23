import { Graph, CellType, Vertex } from './types';


export const clearVisitedPathCells = (grid: Graph): Graph => {
  const newGrid = cloneGrid(grid); // Cloner le graphe existant

  newGrid.vertices.forEach(row =>
    row.forEach(cell => {
      cell.weight = 1; // Réinitialiser le poids à 1

      if (![CellType.Source, CellType.Destination, CellType.Wall].includes(cell.type)) {
        cell.type=CellType.Empty; 
        cell.distance = 'Infinity';
      } else {
        cell.distance = (cell.type === CellType.Source ? 0 : 'Infinity');
      }
    })
  );
  
  return newGrid;
};


  export const GraphInitializer = (cols: number, rows: number): Graph => {
    const vertices: Vertex[][] = new Array(rows);
    for (let i = 0; i < rows; i++) {
      vertices[i] = new Array(rows);
      for (let j = 0; j < cols; j++) {
        vertices[i][j] = {
          position: { x: i, y: j },
          type: (i === rows - 2 && j === cols - 2) ? CellType.Destination : (i === 1 && j === 1) ? CellType.Source : CellType.Empty,
          weight: 1,
          distance: (i === 1 && j === 1) ? 0 : 'Infinity',
        };
      }
    }
    return { rows, cols, vertices };
  };

export const cloneGrid = (grid: Graph): Graph => {
  return {
    ...grid,
    vertices: grid.vertices.map(row => row.map(cell => ({ ...cell })))
  };
};