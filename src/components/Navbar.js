import React from 'react';
import NavbarLinks from "./NavbarLinks";
import HamburgerMenu from "./HamburgerMenu";

import { addSelected, toggleMenu } from '../store/functions';

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="desktop-links-wrapper">
            <NavbarLinks toggleMenu={toggleMenu} addSelected={addSelected}/>
        </div>
        <HamburgerMenu />
    </nav>
  )
}
