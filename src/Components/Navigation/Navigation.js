import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="c-navigation">
      <ul className="c-navigation__list">
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/">Home</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/rides">Rides</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link" to="/credits">Credits</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link"to="/lists">Lists</Link></li>
        <li className="c-navigation__list-item"><Link className="c-navigation__link"to="/stats">Stats</Link></li>
      </ul>
    </nav>  
  )
};

export default Navigation;
