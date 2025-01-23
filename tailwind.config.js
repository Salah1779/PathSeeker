/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          visualizeButton: "#4CAF50", // Bright green for action-oriented visual feedback.
          makeMazeButton: "#FF9800", // Orange for building or creative action.
          gridInitialColor: "#E0E0E0", // Neutral light gray for unvisited cells in the grid.
          walls: "#607D8B", // Dark gray-blue for walls, representing obstacles.
          finalPath: "#2196F3", // Vibrant blue to emphasize the final discovered path.
          visitedCells: "#90CAF9", // Light blue to indicate cells that were visited during exploration.
          backgroundColor: "#FAFAFA", // Off-white for a clean, light background.
          textColor: "#212121", // Dark gray for readable text.
          textButtonColor: "#FFFFFF", // White for button text to contrast with vibrant button colors.
        },
        dark: {
          visualizeButton: "#43A047", // Muted green for visual consistency in dark mode.
          makeMazeButton: "#FB8C00", // Slightly toned-down orange for dark mode balance.
          gridInitialColor: "#37474F", // Dark gray-blue for unvisited cells.
          walls: "#263238", // Almost black for walls, adding clarity against other elements.
          finalPath: "#1E88E5", // Bold blue for the final path.
          visitedCells: "#64B5F6", // Softer blue for visited cells in dark mode.
          backgroundColor: "#121212", // Pure black or near-black for the dark background.
          textColor: "#E0E0E0", // Light gray for readability on dark backgrounds.
          textButtonColor: "#FFFFFF", // White for button text, maintaining contrast.
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // A clean, modern sans-serif font for clarity and professionalism.
      },
    },
  },
  plugins: [],
};
