import React from 'react';


export default function HamburgerIcon({ toggleMenu, toggleAddMeme, toggleTicTacGameStatus, toggleQuizOverLay }) {
  const handleClick = () => {
    if(toggleMenu) toggleMenu();
    if(toggleAddMeme) toggleAddMeme();
    if(toggleTicTacGameStatus) toggleTicTacGameStatus();
    if(toggleQuizOverLay) toggleQuizOverLay();
  }

  return (
    <div className="hamburger-icon" onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
