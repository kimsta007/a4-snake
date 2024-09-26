import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // States for the game
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, 0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const playBoardRef = useRef(null);

  // States for leaderboard and form
  const [leaderboard, setLeaderboard] = useState([]);
  const [name, setName] = useState("");
  const [removeName, setRemoveName] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Game logic functions
  const resetGame = () => {
    setSnake([[5, 5]]);
    setDirection([0, 0]);
    setScore(0);
    setGameOver(false);
    setFoodPosition();
  };

  const setFoodPosition = () => {
    const randomX = Math.floor(Math.random() * 30) + 1;
    const randomY = Math.floor(Math.random() * 30) + 1;
    setFood([randomX, randomY]);
  };

  const handleGameOver = () => {
    setGameOver(true);
    clearInterval(gameInterval.current);
    setShowForm(true);
  };

  const changeDirection = (e) => {
    const { key } = e;
    if (key === "ArrowUp" && direction[1] !== 1) setDirection([0, -1]);
    else if (key === "ArrowDown" && direction[1] !== -1) setDirection([0, 1]);
    else if (key === "ArrowLeft" && direction[0] !== 1) setDirection([-1, 0]);
    else if (key === "ArrowRight" && direction[0] !== -1) setDirection([1, 0]);
  };

  const gameTick = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const newHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];

    // Check for collisions
    if (
      newHead[0] <= 0 || newHead[0] > 30 || newHead[1] <= 0 || newHead[1] > 30 ||
      newSnake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      handleGameOver();
      return;
    }

    // Check if the snake eats the food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      newSnake.unshift(newHead); // Grow the snake
      setFoodPosition(); // Move the food
      setScore(score + 1);
    } else {
      newSnake.pop(); // Move the snake
      newSnake.unshift(newHead);
    }

    setSnake(newSnake);
  };

  const gameInterval = useRef();
  useEffect(() => {
    gameInterval.current = setInterval(gameTick, 100);
    document.addEventListener("keyup", changeDirection);

    return () => {
      clearInterval(gameInterval.current);
      document.removeEventListener("keyup", changeDirection);
    };
  });

  // Leaderboard-related functions
  const get_data = async () => {
    const response = await fetch("/data", {
      method: "GET",
    });
    const data = await response.json();
    setLeaderboard(data);
  };

  const submit = async (event) => {
    event.preventDefault();
    const json = { name, score };
    const body = JSON.stringify(json);

    const response = await fetch("/submit", {
      method: "POST",
      body,
    });
    const data = await response.json();
    setLeaderboard(data);
    setShowForm(false);
    resetGame();
  };

  const delete_row = async (event) => {
    event.preventDefault();
    const json = { name: removeName };
    const body = JSON.stringify(json);

    const response = await fetch("/delete", {
      method: "POST",
      body,
    });
    const data = await response.json();
    setLeaderboard(data);
  };

  const renderLeaderboard = () => {
    return leaderboard.map((entry, index) => (
      <tr key={index}>
        <td>{entry.name}</td>
        <td>{entry.score}</td>
        <td>{entry.date}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <div className="grid">
        {/* Snake Game */}
        <div className="griditem">
          <div className="wrapper">
            <div className="game-details">
              <span className="score">Score: {score}</span>
            </div>
            <div className="play-board" ref={playBoardRef}>
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="snake-segment"
                  style={{ gridArea: `${segment[1]} / ${segment[0]}` }}
                ></div>
              ))}
              <div className="food" style={{ gridArea: `${food[1]} / ${food[0]}` }}></div>
            </div>
            {gameOver && <div className="game-over">Game Over</div>}
          </div>
        </div>

        {/* Leaderboard and Form */}
        <div className="griditem">
          <h2>
            Kay Siegall
            <br />
            CS 4241 Assignment 2
          </h2>
          <p>
            <br />
            JavaScript Snake Game
            <br />
            Use Arrow Keys or Buttons to Play!
          </p>

          <h3>
            <br />
            Leaderboard:
          </h3>
          <input
            type="text"
            placeholder="Enter name"
            value={removeName}
            onChange={(e) => setRemoveName(e.target.value)}
          />
          <button className="btn" onClick={delete_row}>
            Delete score
          </button>

          <table id="score_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderLeaderboard()}</tbody>
          </table>

          {showForm && (
            <div className="form-popup">
              <form className="form-container" onSubmit={submit}>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="btn">Submit score</button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
