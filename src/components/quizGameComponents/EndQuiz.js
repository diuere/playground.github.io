import React from 'react';
import shallow from 'zustand/shallow';
import { useQuizGamePlayersStore, useQuizGamePlayerStore } from '../../store/store';

export default function EndQuiz(props) {
    const { setEndQuiz, setQuizId, refetch } = props;

    const { players, setPlayers } = useQuizGamePlayersStore(store => ( { players: store.players, setPlayers: store.setPlayers } ), 
    shallow );
    const { player, resetPlayer, setPlayerSelected } = useQuizGamePlayerStore(store => ( { player: store.player, resetPlayer: store.resetPlayer, setPlayerSelected: store.setPlayerSelected } ),
    shallow );

    const addPlayerStatus = () => {
      const diff = player.difficulty;
      const timeSelected = player.time;

      let newPlayers = [];// new array that will be passed to one of the players array

      for(const child of Object.keys(players)){ // looks for the players property equivalent to the difficulty value selected by the user
        if(child == diff){
          
          for(const subChild of Object.keys(players[`${child}`])){ // looks for the difficulty property of players equivalent to the time value selected by the user
            if(subChild == timeSelected){

              newPlayers = [...players[`${child}`][`${subChild}`]]; // which should evaluate to an array, be transferred to newPlayers

              if(newPlayers.length < 1){ // and if the array is empty, push an object with the data collect from this game round
                  newPlayers.push({ name: player.name, score: player.score, difficulty: player.difficulty, time: player.time});
              } else { // if the array is not empty

                newPlayers.forEach((p, i) => { // if the user of this game round got a higher score than their previously saved score, remove the previous score and do the following loop. 
                  if(p.name === player.name && p.score < player.score) newPlayers.splice(i, 1);
                })

                for(let i = 0; i < subChild.length; i++) { // this has logic based on a bubble sort, but this loop through the newPlayers and
                  const playersCopied = newPlayers.slice(i);
                  
                  if(newPlayers[i].name !== player.name && newPlayers[i].score < player.score){ // trying to find a player of it that has lower score than the player of this game round
                    newPlayers.splice(i, (newPlayers.length - i), { name: player.name, score: player.score, difficulty: player.difficulty, time: player.time }, ...playersCopied); // once it finds it, it should insert this new player into the previous's player index, and insert the previous one to the next index
                    break;
                  }

                }
              }

              if(newPlayers.length > 3) newPlayers.splice(3, 1); // this prevents newPlayers from having more than 3 values
            }
          }
        }
      }

      setPlayers({ ...players, [`${diff}`]: { ...players[diff], [`${timeSelected}`]: newPlayers } }); // updating players with the new array
      return;
    }
    
    const handleClick = () => {
      addPlayerStatus();
      setPlayerSelected(false); 
      setEndQuiz(false);
      setQuizId(0);
      resetPlayer();
      refetch();
    }

  return (
    <div className="endQuiz-wrapper quiz-wrapper-main-style">
        <p className="quiz-score">points scored: {player.score}</p>
        <button className="restartQuiz-btn quiz-main-btn-style" onClick={handleClick}>back</button>
    </div>
  )
}
