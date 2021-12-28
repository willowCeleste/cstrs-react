import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
import Alert from './Components/Alert/Alert';

import './App.css';

function App() {
  const [alertContent, setAlertContent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const user =  {
    _id: '60f57b4d7104b26ef6ec7a0e',
    username: 'willowceleste',
    firstName: 'Willow',
    lastName: 'Brazuk'
  };

  const showAlertHandler = content => {
    setShowAlert(true);
    setAlertContent(content);
  };

  const dismissAlertHandler = () => {
    setShowAlert(false);
  };

  const deleteRideHandler = async ride => {
    try {
      const result = await fetch(`http://localhost:4000/rides/${ride._id}`, {
        method: 'DELETE'
      });
      console.log(result);
      if (result.ok) {
        alert(`Deleted ride for ${ride.coasterName}`);
      }
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="c-app">
      <Header />
      <div className="c-app__content">
        {showAlert && <Alert message={alertContent} />}
        <Routes>
          <Route path
          ="/coaster/:id" element={<CoasterDetail />}/>
          <Route path="/rides" element={<Rides user={user} confirmDeleteHandler={showAlertHandler} cancelDeleteHandler={dismissAlertHandler} deleteHandler={deleteRideHandler} />} />
          <Route path="/credits" element={<Credits />}/>
          <Route path="/search" element={<SearchResults />}/>
          <Route path="/lists" element={<Lists />}/>
          <Route path="/addRide" element={<AddRide user={user} />}/>
          <Route path="/edit-ride" element={<EditRide />}/>
          <Route path="/rides/:id" element={<RideDetail />}/>
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
