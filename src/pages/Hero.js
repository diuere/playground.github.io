import React from 'react';
import { Link } from "react-router-dom";
import { addSelected } from '../store/functions';

export default function Hero() {

  return (
    <main className="hero page" id="heroPage">
        <div className="container">
            <div className="hero-text-wrapper">
              <h1>Looking for fun?</h1>
              <h2>Welcome to the PlayGround!</h2>
              <p>Feel free to explore some small known Games and Applications.</p>
              <Link to="/tenzyGame" className="get-started-btn tenzyGamePage main-btn-style" onClick={(e) => addSelected(e)}>
                <span className="span tenzyGamePage">get started</span>
              </Link>
            </div>
            <div className="hero-img-wrapper">
              <img src="/havingFun.png" alt="" />
            </div>
        </div>
    </main>
  )
}
