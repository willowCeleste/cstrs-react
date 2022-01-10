import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import './Navigation.css';

const Navigation = () => {
  const [userContext, setUserContext] = useContext(UserContext);
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
  
  const renderLoginLogout = () => {
    return userContext.token ? 
    <li className="c-navigation__list-item">
      <button className="c-navigation__link" onClick={logoutHandler}>Log Out</button>
    </li> : <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/login">Log In</Link></li>
  };

  return (
    <nav className="c-navigation">
      <ul className="c-navigation__list">
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/">Home</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/rides">Rides</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/credits">Credits</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/lists">Lists</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/stats">Stats</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/info">Info</Link></li>
        {renderLoginLogout()}
      </ul>
    </nav>  
  )
};

export default Navigation;
