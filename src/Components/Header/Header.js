import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from "../../store/ui";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Hamburger from "../SVGs/Hamburger";
import MagnifyingGlass from "../SVGs/MagnifyingGlass";

import "./Header.css";

const Header = props => {
  const dispatch = useDispatch();
  const showNav = useSelector(state => state.ui.showNav);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  // Close menu when we hit a new route
  React.useEffect(() => {
    dispatch(uiActions.hideNav());
  }, [dispatch]);

  const toggleNav = () => {
    dispatch(uiActions.toggleNav());
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
      {console.log('show nav', showNav)}
      {props.showToggle && (
          <span className="c-header__nav-toggle" onClick={toggleNav}>
            <Hamburger />
          </span>
        )}
      {showSearch ? <Search showSuggestions showIcon suggestHandler={suggestionHandler} variation="header" /> : <span>cstrs</span>}
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