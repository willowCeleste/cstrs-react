import { useState } from "react";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Hamburger from "../SVGs/Hamburger";
import ContextualMenu from "../ContextualMenu/ContextualMenu";
import "./Header.css";

const Header = props => {
  const [showNav, setShowNav] = useState(false);
  const [showContextual, setShowContextual] = useState(false);
  const [contextualItems, setContextualItems] = useState([]);
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

  const toggleContextual = () => {
    setShowContextual(prevState => {
      setShowContextual(!prevState);
    })
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
      <div className="c-header__contextual-toggle">
        {contextualItems.length ? <button onClick={toggleContextual}>menu</button> : '' }
        {showContextual && (
          <div className="c-header__contextual-menu">
            <ContextualMenu items={contextualItems} />
          </div>
        )}
      </div>
    </div>
  </header>
};

export default Header;