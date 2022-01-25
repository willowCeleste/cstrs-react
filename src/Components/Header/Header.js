import { useState } from "react";
import * as React from "react";
import { useLocation, Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Hamburger from "../SVGs/Hamburger";
import "./Header.css";

const Header = props => {
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
      {props.showToggle && (
          <span className="c-header__nav-toggle" onClick={toggleNav}>
            <Hamburger />
          </span>
        )}
      <span>cstrs</span>
      <div className={`c-header__nav-container ${showNav ? '' : 'c-header__nav-container--hidden'}`}>
        <Navigation />
        <Search className="c-header__search" showSuggestions={false} />
      </div>
      {props.user && (
        <Link className="c-header__user-link" to="/profile">
          <div className="c-header__user">
            {props.user.username}
          <div className="c-header__user-image"></div>
        </div>
        </Link>
      )}
    </div>
  </header>
};

export default Header;