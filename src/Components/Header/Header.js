import { useState } from "react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Hamburger from "../SVGs/Hamburger";
import MagnifyingGlass from "../SVGs/MagnifyingGlass";

import "./Header.css";

const Header = props => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  const suggestionHandler = suggestion => {
    const path = `/${suggestion.type === 'park' ? 'park' : 'coaster' }/${suggestion._id}`
    navigate(path);
    setShowSearch(false);
  }

  return <header className="c-header">
    <div className="c-header__menu-bar">
      {props.showToggle && (
          <span className="c-header__nav-toggle" onClick={toggleNav}>
            <Hamburger />
          </span>
        )}
      {showSearch ? <Search showSuggestions={true} suggestHandler={suggestionHandler} variation="header" /> : <span>cstrs</span>}
      <CSSTransition
        in={showNav}
        timeout={300}
        unmountOnExit
        classNames="fade">
        <div className="c-header__nav-container">
          <Navigation />
        </div>
      </CSSTransition>
      {/* <div className={`c-header__nav-container ${showNav ? '' : 'c-header__nav-container--hidden'}`}>
        <Navigation />
      </div> */}
      {!showSearch && (
        <span className="c-header__search-toggle" onClick={toggleSearch}>
          <MagnifyingGlass />
        </span>
      ) }
    </div>
  </header>
};

export default Header;