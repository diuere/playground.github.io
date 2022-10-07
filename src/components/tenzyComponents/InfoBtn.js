import React from "react";
import { openGameInfo } from "../../store/functions";

export default function InfoBtn(props){
    const { resetDice, isDone, hold } = props;
    
    return (
        <div>
            {hold.length > 0 && <button className="tenzy-btn tenzy-reset-btn" onClick={resetDice}>Reset Game</button>}
            {!isDone && <button className="tenzy-btn" onClick={resetDice}>Roll</button>}
            {isDone && <button className="game-info" onClick={openGameInfo}>!</button>}
        </div>
    )
}