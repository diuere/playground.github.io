import React from 'react';
import shallow from 'zustand/shallow';
import { useQuizGamePlayersStore, useQuizGamePlayerStore } from '../../store/store';

export default function EndQuiz(props) {
  const { setDifficulty, setEndQuiz, setQuizId, refetch } = props;

  const { players, setPlayers } = useQuizGamePlayersStore(store => ( { players: store.players, setPlayers: store.setPlayers } ), 
  shallow );
  const { player, resetPlayer, setPlayerSelected } = useQuizGamePlayerStore(store => ( { player: store.player, resetPlayer: store.resetPlayer, setPlayerSelected: store.setPlayerSelected } ),
  shallow );

  const addPlayerStatus = () => {
    const diffSelected = player.difficulty;
    const timeSelected = player.time;

    let newPlayers = [];// new array that will be passed to one of the players array

    for(const child of Object.keys(players)){ // looks for the players property equivalent to the difficulty value selected by the user
      if(child == diffSelected){
        
        for(const subChild of Object.keys(players[`${child}`])){ // looks for the difficulty property of players equivalent to the time value selected by the user
          if(subChild == timeSelected){

            newPlayers = [...players[`${child}`][`${subChild}`]]; // which should evaluate to an array, be transferred to newPlayers

            if(newPlayers.length < 1){ // and if the array is empty, push an object with the data collect from this game round
                newPlayers.push({ name: player.name, score: player.score, difficulty: player.difficulty, time: player.time});
              } else { // if the array is not empty
                
                newPlayers.forEach((p, i) => { // do the following loop which will remove the previous saved score of a certain user if that same user on this round got a higher score.
                  if(p.name === player.name && p.score < player.score) newPlayers.splice(i, 1);
                })
                
                for (let i = 0; i < subChild.length; i++) { // this has logic based on a bubble sort, but this loop through the newPlayers and
                  const playersCopied = newPlayers.slice(i);
                  
                  if (newPlayers[i].name !== player.name && newPlayers[i].score < player.score) { // compares every player present there to verify one of them has a lower score than the player of this game round
                    newPlayers.splice(i, (newPlayers.length - i), { name: player.name, score: player.score, difficulty: player.difficulty, time: player.time }, ...playersCopied); // if it finds it, it should insert this new player into the previous's player index, and insert the previous one to the next index. in other word, the player of this round would prioritized 
                    break;
                  } else if (newPlayers.length === i + 1) { // this condition allows the loop to push the player of this round even if their score isn't higher than the other player(s) stored. this is useful to simply full fill the newPlayers array in case it still doesn't have three players stored in it.
                    newPlayers.push({ name: player.name, score: player.score, difficulty: player.difficulty, time: player.time});
                    break;
                  }
                  
                }
            }

            if(newPlayers.length > 3) newPlayers.splice(3, 1); // this prevents newPlayers from having more than 3 values
          }
        }
      }
    }

    setPlayers({ ...players, [`${diffSelected}`]: { ...players[diffSelected], [`${timeSelected}`]: newPlayers } }); // updating players with the new array
    return;
  }

  // console.log(player.difficulty)
  
  const handleClick = () => {
    addPlayerStatus();
    setDifficulty(player.difficulty);
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
