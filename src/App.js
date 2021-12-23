import { Routes, Route } from 'react-router-dom';
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

import './App.css';

function App() {
  const user =  {
    _id: '60f57b4d7104b26ef6ec7a0e',
    username: 'willowceleste',
    firstName: 'Willow',
    lastName: 'Brazuk'
  };

  return (
    <div className="c-app">
      <Header />
      <div className="c-app__content">
        <Routes>
          <Route path
          ="/coaster/:id" element={<CoasterDetail />}/>
          <Route path="/rides" element={<Rides user={user} />}/>
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
