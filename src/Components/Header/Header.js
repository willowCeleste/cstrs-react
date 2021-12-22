import { useState } from "react";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
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
        <svg viewBox="0 0 100 80" width="40" height="40" fill="#fff">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </span>
      <div className={`c-header__nav-container ${showNav ? '' : 'c-header__nav-container--hidden'}`}>
        <Navigation />
        <Search className="c-header__search" />
      </div>
    </div>
  </header>
};

export default Header;