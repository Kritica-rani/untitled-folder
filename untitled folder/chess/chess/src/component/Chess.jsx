import { useState } from "react";

export const ChessBoard = ({ boardSize = 8 }) => {
  const [currentBlackIndex, setCurrentBlackIndex] = useState({
    row: 0,
    col: 1,
  });
  const [currentWhiteIndex, setCurrentWhiteIndex] = useState({
    row: 7,
    col: 7,
  });

  const initialBoard = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(""));
  const handleMouseOver = (currentIndexes) => {
    console.log("current Index", currentIndexes);
  };
  console.log(
    "currentBlackIndex Board",
    currentBlackIndex.row,
    currentBlackIndex.col
  );
  const handleDrag = (e, rowIndex, colIndex) => {};
  const handleDragStart = (e, rowIndex, colIndex) => {};
  const handleDragEnd = (e, rowIndex, colIndex) => {
    console.log("end", e, rowIndex, colIndex);
    setCurrentBlackIndex({ row: rowIndex, col: colIndex });
  };
  const handleClicked = (rowIndex, colIndex) => {};
  return (
    <div className="board">
      {initialBoard.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          const currentIndexes = {
            row: currentBlackIndex.row + 1,
            col: currentBlackIndex.col + 1,
          };
          const isDark = (colIndex + rowIndex) % 2 === 1;
          const isBlack =
            rowIndex === currentBlackIndex.row &&
            colIndex === currentBlackIndex.col;
          const isWhite =
            rowIndex === currentWhiteIndex.row &&
            colIndex === currentWhiteIndex.col;
          return (
            <div
              key={`${colIndex - rowIndex}`}
              className={`square ${isDark ? "dark" : "light"}`}
            >
              {isBlack && (
                <span
                  className={`dark_king ${
                    currentIndexes.col === colIndex &&
                    currentIndexes.row === rowIndex
                      ? "highlight"
                      : ""
                  }`}
                  onDrag={(e) => handleDrag(e, colIndex, rowIndex)}
                  onDragStart={(e) => handleDragStart(e, colIndex, rowIndex)}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, colIndex, rowIndex)}
                  onClick={() => handleClicked(rowIndex, colIndex)}
                >
                  Black king
                </span>
              )}
              {isWhite && <span className="dark_king">white king</span>}
            </div>
          );
        })
      )}
    </div>
  );
};
