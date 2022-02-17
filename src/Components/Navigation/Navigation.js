import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from "../../store/ui";
import './Navigation.css';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [userContext, setUserContext] = useContext(UserContext);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        }
      });
      if (!response.ok) {
        alert('Something went wrong');
        throw new Error('Something went wrong');
      }
      setUserContext(prev => {
        return {...prev, token: null}
      });
    } catch (e) {
      console.log(e);
    }
  };

  const renderProfileLink = () => {
    return userContext.token 
     ? <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/profile">Profile</Link></li>
     : ''
  }
  
  const renderLoginLogout = () => {
    return userContext.token ? 
    <li className="c-navigation__list-item">
      <button className="c-navigation__link" onClick={logoutHandler}>Log Out</button>
    </li> : <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/login">Log In</Link></li>
  };

  const dismissNav = () => {
    dispatch(uiActions.hideNav());
  }

  return (
    <nav className="c-navigation">
      { console.log('is logged in', isLoggedIn) }
      <ul className="c-navigation__list">
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/" onClick={dismissNav}>Home</NavLink></li>
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/rides" onClick={dismissNav}>Rides</NavLink></li>
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/credits" onClick={dismissNav}>Credits</NavLink></li>
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/lists" onClick={dismissNav}>Lists</NavLink></li>
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/stats" onClick={dismissNav}>Stats</NavLink></li>
        <li className="c-navigation__list-item"><NavLink className="c-navigation__link" to="/info" onClick={dismissNav}>Info</NavLink></li>
        {renderProfileLink()}
        {renderLoginLogout()}
      </ul>
    </nav>  
  )
};

export default Navigation;
