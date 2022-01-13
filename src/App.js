import { Routes, Route } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContext'
import Protected from './Components/Protected/Protected';
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
import './App.css';

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [contextualIems, setContextualItems] = useState([]);
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
            return { ...oldValues, token: data.token }
          });
        } else {
          setUserContext(oldValues => {
            return { ...oldValues, token: null }
          })
        }
        // renew the auth token every 5 mins
        setTimeout(verifyUser, 5 * 60 * 1000)
      })
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  }, [setUserContext]);

  const handleContextualItems = items => {
    console.log('setting contextual items', items);
    // setContextualItems(items);
    return items;
  }

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const routes = [
    {
      path: 'sign-up',
      element: <Register />,
      protected: false
    },
    {
      path: 'login',
      element: <Login />,
      protected: false
    },
    {
      path: '/coaster/:id',
      element: <CoasterDetail />,
      protected: true
    },
    {
      path: 'rides',
      element: <Rides />,
      protected: true
    },
    {
      path: 'credits',
      element: <Credits />,
      protected: true
    },
    {
      path: 'search',
      element: <SearchResults />,
      protected: true
    },
    {
      path: 'lists',
      element: <Lists />,
      protected: true
    },
    {
      path: 'list-detail',
      element: <ListDetail setContextual={handleContextualItems} />
    },
    {
      path: 'addRide',
      element: <AddRide />,
      protected: true
    },
    {
      path: 'edit-ride',
      element: <EditRide />,
      protected: true
    },
    {
      path: '/rides/:id',
      element: <RideDetail />,
      protected: true
    },
    {
      path: '/stats',
      element: <Stats />,
      protected: true
    },
    {
      path: '/info',
      element: <Info />,
      protected: false
    },
    {
      path: '/add-to-list',
      element: <AddToList />,
      protected: true
    },
    {
      path: '/',
      element: <Home />,
      protected: true
    },
  ];

  // const renderRoutes = () => {
  //   return routes.map(route => {
  //     return route.protected ? <Route path={route.path} element={<Protected>{route.element}</Protected>}/> : <Route path={route.path} element={route.element} />
  //   });
  // }

  return (
    <div className="c-app">
      <Header showToggle={userContext.token !== null } contextualItems={handleContextualItems()} />
      <div className="c-app__content">
      <Routes>
        {routes.map(route => {
          return route.protected ? <Route path={route.path} element={<Protected>{route.element}</Protected>}/> : <Route path={route.path} element={route.element} />
        })}
      </Routes>
      </div>
    </div>
  );
}

export default App;
