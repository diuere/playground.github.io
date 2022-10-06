import React from 'react';
import { Link } from "react-router-dom";

export default function NavbarLinks({ toggleMenu, addSelected }) {
  const handleClick = (e) => {
    if(toggleMenu) toggleMenu();
    if(addSelected) addSelected(e); // add a css class to change the link style once its clicked/selected
  }

  return (
    <ul className="navbar-links-wrapper">
        <li>
          <Link to="/" className="route-selector heroPage" onClick={handleClick}>Home</Link>
        </li>

        <li>
          <Link to="/tenzyGame" className="route-selector tenzyGamePage" onClick={handleClick}>Tenzy Game</Link>
        </li>
        <li>
          <Link to="/ticTacToePage" className="route-selector ticTacToePage" onClick={handleClick}>Tic Tac Toe</Link>
        </li>
        <li>
          <Link to="/quizGamePage" className="route-selector quizGamePage" onClick={handleClick}>Quiz Game</Link>
        </li>
        <li>
          <Link to="/memeGeneratorPage" className="route-selector memeGeneratorPage" onClick={handleClick}>Meme Generator</Link>
        </li>
        <li className="contact-btn-wrapper">
          <Link to="/contactPage" className="contact-btn contactPage main-btn-style" onClick={handleClick}>
            <span>contact</span>
          </Link>
        </li>
    </ul>
  )
}
