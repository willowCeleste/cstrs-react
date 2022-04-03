import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { userActions } from './store/user';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Rides from './Pages/Rides';
import CoasterDetail from './Pages/CoasterDetail';
import Search from './Pages/Search/Search';
import SearchResults from './Pages/SearchResults';
import Lists from './Pages/Lists';
import AddRide from './Pages/AddRide/AddRide';
import EditRide from './Pages/EditRide/EditRide';
import Credits from './Pages/Credits/Credits';
import RideDetail from './Pages/RideDetail/RideDetail';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Stats from './Components/Stats';
import Info from './Pages/Info/Info';
import ListDetail from './Pages/ListDetail/ListDetail';
import AddToList from './Pages/AddToList/AddToList';
import CreateList from './Pages/CreateList/CreateList';
import Profile from './Pages/Profile/Profile';
import ParkDetail from './Pages/ParkDetail/ParkDetail';
import Alert from './Components/Alert/Alert';
import Welcome from './Pages/Welcome/Welcome';
import './App.css';

function App() {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isLoggedIn = !!localStorage.getItem('cstrsToken');
  const showAlert = useSelector(state => state.ui.showAlert);
  const alertContent = useSelector(state => state.ui.alertContent);
  const [notification, setNotification] = useState('');
  console.log('is logged innnn', isLoggedIn);
  const verifyUser = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/refreshToken`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();

        dispatch(userActions.verify({
          token: data.token,
          isLoggedIn: !!data.token,
          username: data.user.username
        }))
      } else {
        console.log('in verify');
        dispatch(userActions.verify({
          token: '',
          isLoggedIn: false,
          username: ''
        }));
      }
      // setTimeout(verifyUser, 5 * 60 * 1000);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  }, [dispatch]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const protectedRoute = (path, component) => {
    console.log('inside', isLoggedIn);
    return <Route path={path} element={ isLoggedIn ? component : <Navigate to="/welcome" /> }/>;
  };

  return (
    <div className="c-app">
      <Header showToggle={ isLoggedIn } user={{}} />
      <div className="c-app__content">
        {/* ---- Routes ---- */}
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          {/* { !isLoggedIn && <Route path="/login" element={<Login />} /> } */}
          <Route path="/login" element={<Login />} />
          { !isLoggedIn && <Route path="/sign-up" element={<Register />} /> }
          { protectedRoute('/rides', <Rides />) }
          { protectedRoute('/credits', <Credits />) }
          { protectedRoute('/lists', <Lists />) }
          { protectedRoute('/list-detail', <ListDetail />) }
          { protectedRoute('/addRide', <AddRide />) }
          { protectedRoute('/edit-ride', <EditRide />) }
          { protectedRoute('/rides/:id', <RideDetail />) }
          { protectedRoute('/stats', <Stats />) }
          { protectedRoute('/add-to-list', <AddToList />) }
          { protectedRoute('/create-list', <CreateList />) }
          { protectedRoute('/profile', <Profile />) }
          { protectedRoute('/park/:id', <ParkDetail />) }
          { protectedRoute('/search', <Search />) }
          { protectedRoute('/coaster/:id', <CoasterDetail />) }
          <Route path="/info" element={<Info />} />
          <Route path="/" element={<Home />} />
          {/* { protectedRoute('/', <Home protected />) } */}
        </Routes>
        
        <CSSTransition
          in={showAlert}
          timeout={300}
          classNames="fade"
          unmountOnExit>
            <Alert message={alertContent} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
