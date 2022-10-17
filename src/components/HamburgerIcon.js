import React from 'react';

export default function HamburgerIcon({ toggleMenu }) {
  const handleClick = () => {
    if(toggleMenu) toggleMenu();
  }

  return (
    <div className="hamburger-icon" onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
