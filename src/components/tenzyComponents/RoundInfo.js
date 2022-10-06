import React from "react";
import { nanoid } from "nanoid"; // nanoid@3.1.28

// zustand
import shallow from "zustand/shallow";
import { useTenzyStore } from "../../store/store";


export default function RoundInfo(props){
    const {bestScore, setBestScore} = props.score;
    const { roll, gameTime, addFav, setAddFav } = useTenzyStore(state => ( { roll: state.roll, gameTime: state.gameTime, addFav: state.addFav, setAddFav: state.setAddFav, } )
    , shallow);
    
    // state that determines either the "add to favorite" btn appear or not
       
    function addBest(){
        setAddFav(false); // disabling the "add to favorite" button
        if(bestScore.length < 3){
            setBestScore(prevScore => {
                const newBest = [...prevScore];
                if(prevScore.length < 1){ // first bestScore update
                    newBest.push({ id: nanoid(), rolls: roll, time: gameTime })
                } else { // updating and organizing bestScore
                    if (roll < prevScore[0].rolls && gameTime < prevScore[0].time) { // adding best fav score
                        newBest.unshift({ id: nanoid(), rolls: roll, time: gameTime })
                        
                    } else if(roll < prevScore[0].rolls || gameTime < prevScore[0].time){
                        newBest.unshift({ id: nanoid(), rolls: roll, time: gameTime })

                    } else if (prevScore.length > 1) { // adding middle fav score
                        if (roll < prevScore[1].rolls || gameTime < prevScore[1].time) {
                            const prevFav = prevScore[1];
                            newBest.splice(1, 1, { id: nanoid(), rolls: roll, time: gameTime}, prevFav);
                        } else {
                            newBest.push({ id: nanoid(), rolls: roll, time: gameTime});
                        }
                        
                    } else { // adding "middle" or last fav score
                        newBest.push({ id: nanoid(), rolls: roll, time: gameTime});
                    }
                }
                return newBest;
            })
        }
    }
    
    return (
        <div className="round-info">
            <h3 className="info-title">Game Info</h3>
            <p className="info-rolls"><span className="bold">Rolls:</span> {roll} </p>
            <p className="info-time"><span className="bold">Time:</span> {gameTime} s</p>
            { bestScore.length < 3 ? 
                addFav && 
                <label className="addScore-label">Add to Favorite Score 
                    <button className="add-score-btn" onClick={addBest}>+</button>
                </label>
                :
                <span className="addScore-label">Remove a favorite score to add a new one</span>
            }
        </div>
    )
}