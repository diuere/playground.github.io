import React from 'react';
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
  
  const handleTimeSelection = (time) => { // updates the time limit and the counter to the option the user selected, also it's responsible for the actual game start.
    setTimeLimit(time);
    setCounter(time);

    addPlayerDifficulty(difficulty);
    addPlayerTime(time);

    if(player.name) setStartQuiz(true); // if the user has certainly a name, the game shall start
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerSelected(true); // sets a boolean, which in this case will help on determining whether the .quiz-specifications should appear or not
    deactivateStartBtnStyle(); // imported function, it causes the affect of disappearing of the .start-quiz-btn
  }

  const bestPlayersPreview = players[`${difficulty}`][`${timeLimit}`].map((player, id) => ( // element that represents a preview highlight of the best players based on the last users gameplay. 
    <li key={id} className="quiz-bestPlayer-preview">
         <span>Name:</span> {player.name}
         <span>Score:</span> {player.score}
     </li>
 ))

  return (
    <div className="start-quiz-wrapper quiz-wrapper-main-style">
        <h1>Quiz Game</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={player.name} name="name" placeholder='user name' maxLength="15" required onChange={(e) => setPlayerName(e.target.value)}/>
            <button className='start-quiz-btn quiz-main-btn-style'>start quiz</button>
        </form>
        <div className="quiz-specifications">
          { playerSelected && <QuizDiff mainClassName={"quiz-difficulty"} classSelected={"quiz-specification-selected"} setState={setDifficulty} />}
          { playerSelected && <QuizTime mainClassName={"quiz-timeOut"} classSelected={""} setState={handleTimeSelection}/>}
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
