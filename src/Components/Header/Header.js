import { useState } from "react";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Hamburger from "../SVGs/Hamburger";
import "./Header.css";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  // Close menu when we hit a new route
  React.useEffect(() => {
    setShowNav(false);
  }, [location]);

  const toggleNav = () => {
    setShowNav(prevState => {
      setShowNav(!prevState);
    });
  };

  return <header className="c-header">
    <div className="c-header__menu-bar">
      <span>cstrs</span>
      <span onClick={toggleNav}>
        <Hamburger />
      </span>
      <div className={`c-header__nav-container ${showNav ? '' : 'c-header__nav-container--hidden'}`}>
        <Navigation />
        <Search className="c-header__search" />
      </div>
    </div>
  </header>
};

export default Header;