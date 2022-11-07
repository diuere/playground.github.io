import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';

import { useQuizGamePlayersStore, useQuizGamePlayerStore, useQuizGameTimeStore } from '../../store/store';
import { deactivateStartBtnStyle, toggleQuizOverLay } from '../../store/functions';

import QuizDiff from './QuizDiff';
import QuizTime from './QuizTime';
import QuizSpecs from './QuizSpecs';



export default function StartQuiz(props) {
  const { difficulty, setDifficulty, setStartQuiz } = props;
  const { timeLimit, setTimeLimit, setCounter } = useQuizGameTimeStore(store => ({ timeLimit: store.timeLimit, setTimeLimit: store.setTimeLimit, setCounter: store.setCounter, } ),
  shallow );
  const { player, setPlayerName, addPlayerDifficulty, addPlayerTime, playerSelected, setPlayerSelected } = useQuizGamePlayerStore(store => ( { player: store.player, setPlayerName: store.setPlayerName, addPlayerDifficulty: store.addPlayerDifficulty, addPlayerTime: store.addPlayerTime,  playerSelected: store.playerSelected, setPlayerSelected: store.setPlayerSelected } ),
  shallow );
  const players = useQuizGamePlayersStore(store => store.players);

  useEffect(() => {// if the user has certainly a name and if the user has selected the game modes, the game shall start
    if(player.name && player.time && player.difficulty) setStartQuiz(true); 
  }, [player.name, player.time, player.difficulty])
  
  const handleSelection = (diffSelected, timeSelected) => { // function responsible for implementing the user specificities for the game
    if (diffSelected) { // updates the game difficulty to the option the user selected
      setDifficulty(diffSelected);
      addPlayerDifficulty(diffSelected);
    }
    
    if (timeSelected) { // updates the time limit and the counter to the option the user selected
      setTimeLimit(timeSelected);
      setCounter(timeSelected);
      addPlayerTime(timeSelected);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerSelected(true); // sets a boolean, which in this case will help on determining whether the .quiz-specifications should appear or not
    deactivateStartBtnStyle(); // imported function, it causes the affect of disappearing of the .start-quiz-btn
  }

  const bestPlayersPreview = difficulty ? players[`${difficulty}`][`${timeLimit}`].map((player, id) => ( // element that represents a preview highlight of the best players based on the last users game play. 
  <li key={id} className="quiz-bestPlayer-preview">
       <span>Name:</span> {player.name}
       <span>Score:</span> {player.score}
   </li>
  )) : [];

  return (
    <div className="start-quiz-wrapper quiz-wrapper-main-style">
        <h1>Quiz Game</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={player.name} name="name" placeholder='user name' maxLength="15" required onChange={(e) => setPlayerName(e.target.value)}/>
            <button className='start-quiz-btn quiz-main-btn-style'>start quiz</button>
        </form>
        <div className="quiz-specifications">
          { playerSelected && <QuizDiff mainClassName={"quiz-difficulty"} classSelected={""} handleSelection={handleSelection}/>}
          { playerSelected && <QuizTime mainClassName={"quiz-timeOut"} classSelected={""} handleSelection={handleSelection}/>}
        </div>
        <div className="players-info-wrapper">
          <ol className="bestPlayers-preview-wrapper">
              {bestPlayersPreview.length ?
                bestPlayersPreview :
                <div className='quiz-none-player'>
                  no players registered
                </div>
              }
          </ol>
          <button className="game-info" onClick={toggleQuizOverLay}>!</button>
        </div>
        <div className="quiz-overlay main-overlay-style">
          <QuizSpecs />
        </div>
    </div>
  )
}
