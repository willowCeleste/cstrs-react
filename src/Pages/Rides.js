import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import ListSwipeAction from '../Components/ListSwipeAction/ListSwipeAction';
import RideCard from '../Components/RideCard/RideCard';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import "./Rides.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Rides = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
  
  const fetchRidesHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/rides/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setRides(data);
      setLoading(false);
    } catch(e) {
      console.log(e);
    }
  }, []);

  const deleteRideHandler = () => {
    alert("Are you sure you want to delete this ride?");
  };

  const editRideHandler = ride => {
    navigate('/edit-ride', { state: {
      ride: ride,
      edit: true
    }})
  }

  useEffect(() => {
    fetchRidesHandler()
  }, [fetchRidesHandler]);

  const renderList = () => {
    if (loading) {
      return <div>Loading!</div>
    } else if (rides.length) {
      return (
        <>
          <h2>Rides</h2>
          <SwipeableList>
            {rides.map(ride => {
              const imageUrl = ride.image ? `http://localhost:3000/${ride.image}` : 'https://via.placeholder.com/150?text=No+Image';
              return (
                <SwipeableListItem
                  key={ride._id}
                  swipeLeft={{
                    content: <ListSwipeAction label="Delete" color="red" position="right"/>,
                    action: deleteRideHandler
                  }} 
                  swipeRight={{
                    content: <ListSwipeAction label="Edit" color="blue" position="left"/>,
                    action: () => editRideHandler(ride)
                  }}
                >
                  <RideCard thumbnail={imageUrl} date={ride.date} coaster={ride.coasterName} park={ride.parkName}/>
                </SwipeableListItem>
              )
            })}
          </SwipeableList>
        </>
      )
    } else {
      return <p>You haven't recorded any rides yet!</p>
    }
  }

  return <div>
    {renderList()}
  </div>
};

export default Rides;