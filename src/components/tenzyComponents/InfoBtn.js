import React from "react";

// function to open game information
function openGameInfo(){
    const gameInfoWrapper = document.querySelector("#gameInfoWrapper");
    const tenzyOverlay = document.querySelector(".tenzy-overlay");
    
    tenzyOverlay.classList.add("tenzyActiveOverlay");
    gameInfoWrapper.classList.add("opened");
}

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