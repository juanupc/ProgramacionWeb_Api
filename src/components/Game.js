import { useState } from "react";
import Board from "./Board";
import Winners from "./History";

export default function Game() {

  const url = "https://6453b15bc18adbbdfea4cf77.mockapi.io/winner/winners";

  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), coordinates: { row: null, col: null } },
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const [orden, setOrden] = useState("ascendente");
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [Gan, setGan] = useState("");

  function handleSortMoves() {
    if (orden === "ascendente") {
      setOrden("descendente");
    } else {
      setOrden("ascendente");
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {

    let description;

    if (move > 0) {
      description = `Ir hacia la jugada # ${move} en la posición (${squares.coordinates.row},${squares.coordinates.col})`;
    } else {
      description = "Ir al inicio del juego";
    }

    let element = <button onClick={() => jumpTo(move)}>{description}</button>;
    if (move === currentMove) {
      element = <span>{"movimiento # " + currentMove}</span>;
    }
    return <li key={move}>{element}</li>;
  });

  if (orden === "descendente") {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          setGan={setGan}
          url={url}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
        <Winners winner={Gan} />
      </div>
      <div className="game-info">
        <button class="button button-default"
          onClick={handleSortMoves}>
          {orden === "ascendente"
            ? "Ordenar Descendentemente"
            : "Ordenar Ascendentemente"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
