import React from 'react';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../store/functions';
import Navbar from "./Navbar";


export default function Header() {
  return (
    <header id="mainHeader">
        <div className="container">
            <div className="logo" onClick={toggleMenu}>
              <Link to="/">PlayGround</Link>
            </div>
            <Navbar />
        </div>
    </header>
  )
}
