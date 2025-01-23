export interface Position {
  x: number;
  y: number;
}

export enum Algorithm {
    DFS,
    BFS,
    DIJKSTRA
    }

export enum CellType {
    Source ,
    Destination ,
    Wall ,
    Visited ,
    Path ,
    Empty ,
}

export interface Vertex {
  position: Position;
  type: CellType;
  weight: number;
  distance: number|'Infinity';
}

export interface Graph {
    cols: number;
    rows: number;
    vertices: Vertex[][];
}