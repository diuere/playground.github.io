import React from 'react';
import HamburgerIcon from './HamburgerIcon';
import NavbarLinks from './NavbarLinks';

import { addSelected, toggleMenu } from '../store/functions';

export default function HamburgerMenu() {
  return (
    <div className="hamburger-menu-wrapper" id="hamburgerMenuWrapper">
      <HamburgerIcon toggleMenu={toggleMenu}/>
      <div className="menu-overlay main-overlay-style">
        <NavbarLinks toggleMenu={toggleMenu} addSelected={addSelected}/>
      </div>
    </div>
  )
}
