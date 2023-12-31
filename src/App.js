import { useState } from 'react';

// Tic-tac-toe tutorial 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="statusBtn" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      <div className="container">
        <Panel />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Redo Calculator app

function Value({ value, onClick }) {
  return (
    <button onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
};

function Panel() {
  const [displayValue, setDisplayValue] = useState('');
  const [calculated, setCalculated] = useState(false);
  const handleClick = (value) => {
    const lastChar = displayValue[displayValue.length - 1];
    console.log(lastChar);
    if (calculated) {
      setDisplayValue("");
      setCalculated(false);
    } else if ('+-*/'.includes(displayValue.charAt(0))) {
      setDisplayValue(value);
    } else if ('+-*/'.includes(lastChar) && '+-*/'.includes(value)) {
      setDisplayValue(displayValue.slice(0, -1) + value);
    } else if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clear();
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const calculate = () => {
    try {
      const result = calculation(displayValue);
      setDisplayValue(result.toString());
      setCalculated(true);
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const clear = () => {
    setDisplayValue('');
  };

  const calculation = (expression) => {
    const tokens = expression.match(/\d+|[+*/-]/g);
    if (!tokens) return 0;

    const operators = {
      '/': (a, b) => a / b,
      '*': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    };

    let currentOperator = '+';
    let result = 0;

    tokens.forEach((token) => {
      if (['/', '*', '+', '-'].includes(token)) {
        currentOperator = token;
      } else {
        const number = parseFloat(token);
        result = operators[currentOperator](result, number);
      }
    });

    return result;
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        <Value value="7" onClick={handleClick} />
        <Value value="8" onClick={handleClick} />
        <Value value="9" onClick={handleClick} />
        <Value value="+" onClick={handleClick} />
        <Value value="4" onClick={handleClick} />
        <Value value="5" onClick={handleClick} />
        <Value value="6" onClick={handleClick} />
        <Value value="-" onClick={handleClick} />
        <Value value="1" onClick={handleClick} />
        <Value value="2" onClick={handleClick} />
        <Value value="3" onClick={handleClick} />
        <Value value="*" onClick={handleClick} />
        <Value value="C" onClick={handleClick} />
        <Value value="0" onClick={handleClick} />
        <Value value="/" onClick={handleClick} />
        <Value value="=" onClick={handleClick} />
      </div>
    </div>
  );
};