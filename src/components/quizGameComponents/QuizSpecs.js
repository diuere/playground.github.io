import React, { useState } from 'react';
import { useQuizGamePlayersStore } from '../../store/store';
import QuizDiff from './QuizDiff';
import QuizTime from './QuizTime';
import CloseGameInfo from "../CloseGameInfo";
import { toggleQuizOverLay } from '../../store/functions';

export default function QuizSpecs() {
    const [diffSpec, setDiffSpec] = useState("easy");
    const [timeSpec, setTimeSpec] = useState(30);
    const players = useQuizGamePlayersStore(store => store.players);
    const setPlayers = useQuizGamePlayersStore(store => store.setPlayers);

    const bestPlayers = players[`${diffSpec}`][`${timeSpec}`].map((player, id) => ( // element that represents the best players based on the user selection.
        <ul key={id} className="quiz-best-player">
            <li>
                <span>Name:</span> {player.name}
                <span>Score:</span> {player.score}
            </li>
            <li>
                <span>Difficulty:</span> {player.difficulty}
                <span>Time:</span> {player.time}
            </li>
        </ul>
    ))

    const removePlayers = () => { // responsible for removing the data prevent in a certain array of the players store
        if(bestPlayers.length > 0) {
            const alerting = window.confirm("You are about to remove all players saved data. Are you sure you want to continue?");

            if(alerting) setPlayers({ ...players, [`${diffSpec}`]: { ...players[diffSpec], [`${timeSpec}`]: [] } });
        }
    }

  return (
    <div className="quiz-saved-specifications">
        <CloseGameInfo toggleQuizOverLay={toggleQuizOverLay}/>
        <h2>Best Players</h2>
        <div className="quiz-best-players-wrapper">
            {bestPlayers.length > 0?
                bestPlayers :
                <div className='quiz-none-player'>
                    no players registered
                </div>
            }
        </div>
        <QuizDiff mainClassName={"diffSpec-selector"} classSelected={"quiz-specification-selected"} setState={setDiffSpec}/>
        <QuizTime mainClassName={"timeSpec-selector"} classSelected={"quiz-specification-selected"}setState={setTimeSpec}/>
        <button className='quiz-remove-player-data' onClick={removePlayers}>remove</button>
    </div>
  )
}
 