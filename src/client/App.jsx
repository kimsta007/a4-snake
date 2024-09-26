import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { snake } from './js/snake';
import { main } from './js/main';
import "./App.css";

function App() {

  return (
    <div className="App">
        <div class="form-popup" id="submitScore">
      <form class="form-container">
        <input type="text" id="nameField" placeholder="Enter name" />
        <button id = "submit-button" class="btn">Submit score</button>
        <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
      </form>
    </div>
    <div class="grid">
      <div class="griditem">
        <div class="wrapper">
          <div class="game-details">
            <span class="score" id="score">Score: 0</span>
          </div>
          <div class="play-board"></div>
          <div class="controls">
            <i data-key="ArrowLeft" class="fa-solid fa-arrow-left-long"></i>
            <i data-key="ArrowUp" class="fa-solid fa-arrow-up-long"></i>
            <i data-key="ArrowRight" class="fa-solid fa-arrow-right-long"></i>
            <i data-key="ArrowDown" class="fa-solid fa-arrow-down-long"></i>
          </div>
        </div>
      </div>
      </div>
      <div class="griditem">
        <h2>
          Kay Siegall
          <br />
          CS 4241 Assignment 2
        </h2>
        <p><br/>JavaScript Snake Game<br/>Use Arrow Keys or Buttons to Play!</p>
        <h3>
          <br />
          Leaderboard:
        </h3>
          <input type="text" id="removeField" placeholder="Enter name" />
          <button id="delete-button" class="btn">Delete score</button>
        <table id="score_table">
          <tbody id="score_tbody">
          </tbody>
          <form class="form-container">
          </form>
        </table>
      </div>
    </div>
  );
}

export default App;
