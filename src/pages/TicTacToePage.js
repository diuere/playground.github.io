import React, { useState } from 'react';
import { useEffect } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';

import ToeNode from '../components/ticTacToeComponents/ToeNode';

import { toggleTicTacOverlay } from '../store/functions';

export default function TicTacToePage() {
  const tic = "O";
  const tac = "X";

  const [player, setPlayer] = useState(tac);
  const [mainRow, setMainRow] = useState(Array(9).fill(null));
  const [winState, setWinState] = useState(false);
  const endGame = mainRow.every(node => node !== null);

  const verifyWinner = () => {
    const patterns = [ // winning patterns
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i < patterns.length; i++) {
      const [a, b, c] = patterns[i];

      if(mainRow[a] && mainRow[a] === mainRow[b] && mainRow[a] === mainRow[c]){
        return true;
      }
    }
    return false;
  }
  
  const handleSelection = (id) => {
    if(winState || endGame) return; // if winState or if endGame is true, the user should not be able to select any other node, thus return;
    
    setMainRow(prevState => {
      if(prevState[id] !== null) return prevState;// forbids the user from selecting the same node twice
      const newState = prevState.map((item, index) => index === id ? player : item); // map over mainRow, identify the node the was clicked and assign a value to it.
      return newState;
    })

    setPlayer(prevState => prevState === tac ? tic : tac); // switch players

    return;
  }

  useEffect(() => {
    // test if there's a winner, and if there's a winner reset winState to true and toggle the tic-tac-overlay
    const test = verifyWinner();
    if(test) {
      setWinState(true);
      toggleTicTacOverlay(); // this function is imported
    };
  }, [mainRow])

  const resetGame = () => {
    setMainRow(Array(9).fill(null));
    setPlayer(tac)
    setWinState(false);
  }

  const rows = mainRow.map((value, id) => <ToeNode key={id} id={id} value={value} handleSelection={handleSelection} />);
  
  return (
    <main className="ticTacToe-page page" id="ticTacToePage">
        <div className="container">
            <div className="ticTacToe-body-wrapper">
                <div className="ticTacToe-body">
                  {rows}
                </div>
                { endGame && !winState ? 
                  <p className="no-winner-alert">Ops! There had no winner this time.</p> : 
                  <p className="player-selected">Current player: <span>{player}</span></p> 
                }
                <div className="tic-tac-overlay main-overlay-style">
                  <h2 className="tic-tac-winner">{player === tac ? tic : tac}</h2>
                  <p>is the winner!</p>
                  <button onClick={toggleTicTacOverlay}>back</button>
                </div>
                <button className="reset-tic-tac-game" onClick={resetGame}>reset game</button>
            </div>
        </div>
    </main>
  )
}