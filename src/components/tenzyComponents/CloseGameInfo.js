import React from 'react';

// function to remove the game information
function closeGameInfo(){
    const gameInfoWrapper = document.querySelector("#gameInfoWrapper");
    const tenzyOverlay = document.querySelector(".tenzy-overlay");
    
    tenzyOverlay.classList.remove("tenzyActiveOverlay");
    gameInfoWrapper.classList.remove("opened");
}

export default function CloseGameInfo(){
    return (
        <div className="close-icon" onClick={closeGameInfo}>
            <span className="left"></span>
            <span className="right"></span>
        </div>
    )
}