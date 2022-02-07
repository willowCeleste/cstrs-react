import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContext'
import { CSSTransition } from 'react-transition-group';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Rides from './Pages/Rides';
import CoasterDetail from './Pages/CoasterDetail';
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
import Snackbar from './Components/Snackbar/Snackbar';
import './App.css';

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [notification, setNotification] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const verifyUser = useCallback(async () => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/refreshToken`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(async response => {
        if (response.ok) {
          const data = await response.json();
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token, user: data.user }
          });
        } else {
          setUserContext(oldValues => {
            return { ...oldValues, token: null }
          });
        }
        // renew the auth token every 5 mins
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  }, [setUserContext]);

  const handleNotification = message => {
    setNotification(message);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      setNotification('');
    }, 3000);
  }

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const routes = [
    {
      path: 'sign-up',
      element: <Register />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '/coaster/:id',
      element: <CoasterDetail />
    },
    {
      path: 'rides',
      element: <Rides />
    },
    {
      path: 'credits',
      element: <Credits />
    },
    {
      path: 'search',
      element: <SearchResults />
    },
    {
      path: 'lists',
      element: <Lists />
    },
    {
      path: 'list-detail',
      element: <ListDetail onNotification={handleNotification} />
    },
    {
      path: 'addRide',
      element: <AddRide />
    },
    {
      path: 'edit-ride',
      element: <EditRide />
    },
    {
      path: '/rides/:id',
      element: <RideDetail />
    },
    {
      path: '/stats',
      element: <Stats />
    },
    {
      path: '/info',
      element: <Info />
    },
    {
      path: '/add-to-list',
      element: <AddToList />
    },
    {
      path: '/create-list',
      element: <CreateList />
    },
    {
      path: '/profile',
      element: <Profile onNotification={handleNotification} />
    },
    {
      path: '/park/:id',
      element: <ParkDetail />
    },
    {
      path: '/',
      element: <Home />
    }
  ];

  return (
    <div className="c-app">
      <Header showToggle={userContext.token !== null } user={userContext.user} />
      <div className="c-app__content">
        <Routes>
          {routes.map(route => {
            return <Route key={route.path} path={route.path} element={route.element}/>
          })}
        </Routes>
        <CSSTransition
          in={showSnackbar}
          timeout={300}
          classNames="fade"
          unmountOnExit>
          <Snackbar message={notification} />
        </CSSTransition>
   
      </div>
    </div>
  );
}

export default App;
