import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import ListSwipeAction from '../Components/ListSwipeAction/ListSwipeAction';
import RideCard from '../Components/RideCard/RideCard';
import ConfirmAlert from '../Components/ConfirmAlert/ConfirmAlert';
import Title from '../Components/Title/Title';
import Pager from '../Components/Pager/Pager';
import Loading from '../Components/Loading/Loading';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import "./Rides.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Rides = props => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const userId = props.user._id;
  
  const fetchRidesHandler = useCallback(async page => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}/rides?limit=10&page=${page}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setRides(data.rides);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages)
      setTotalRides(data.totalRides);
      window.scrollTo(0, 0);
    } catch(e) {
      console.log(e);
    }
    setLoading(false);
  }, [userId]);


  useEffect(() => {
    fetchRidesHandler(1)
  }, [fetchRidesHandler]);

  const deleteRideHandler = ride => {
    props.confirmDeleteHandler(
      <ConfirmAlert 
        message={`Delete ride for ${ride.coasterName}?`}
        cancelHandler={props.cancelDeleteHandler}
        confirmHandler={() => props.deleteHandler(ride)} />
        );
  };

  const editRideHandler = ride => {
    navigate('/edit-ride', { state: {
      ride: ride,
      edit: true
    }})
  }

  const renderList = () => {
    if (loading) {
      return <div>Loading!</div>
    } else if (rides.length) {
      return (
        <>
          <Title text="Rides" />
          <SwipeableList>
            {rides.map(ride => {
              const imageUrl = ride.image ? `http://localhost:3000/${ride.image}` : 'https://via.placeholder.com/150?text=No+Image';
              return (
                <SwipeableListItem
                  key={ride._id}
                  swipeLeft={{
                    content: <ListSwipeAction label="Delete" color="red" position="right"/>,
                    action: () => deleteRideHandler(ride)
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

  return loading ? <Loading /> : <div>
    {renderList()}
    <Pager currentPage={currentPage} totalPages={totalPages} onPrevious={fetchRidesHandler} onNext={fetchRidesHandler} />
  </div>
};

export default Rides;