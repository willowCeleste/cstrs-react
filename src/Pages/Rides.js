import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { uiActions } from '../store/ui';
import { useDispatch } from 'react-redux';
import ListSwipeAction from '../Components/ListSwipeAction/ListSwipeAction';
import RideCard from '../Components/RideCard/RideCard';
import ConfirmAlert from '../Components/ConfirmAlert/ConfirmAlert';
import Title from '../Components/Title/Title';
import Pager from '../Components/Pager/Pager';
import Alert from '../Components/Alert/Alert';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import "./Rides.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Rides = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [rides, setRides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  
  const fetchRidesHandler = useCallback(async page => {
    if (userContext.token) {
      dispatch(uiActions.showLoading());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/rides?limit=10&page=${page}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext.token}`
          }
        });
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
      dispatch(uiActions.hideLoading())
    }
  }, [dispatch, userContext.token]);


  useEffect(() => {
    fetchRidesHandler(1);
  }, [fetchRidesHandler]);

  const deleteRideHandler = ride => {
    setAlertContent(<ConfirmAlert 
      message={`Delete ride for ${ride.coasterName}?`}
      cancelHandler={cancelDeleteHandler}
      confirmHandler={() => deleteHandler(ride)} />);
    setShowAlert(true);
  };

  const cancelDeleteHandler = () => {
    setShowAlert(false);
  };

  const deleteHandler = async ride => {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/rides/${ride._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        }
      });
      if (result.ok) {
        alert(`Deleted ride for ${ride.coasterName}`);
        setShowAlert(false);
        fetchRidesHandler(1);
      } else {
        alert('Something went wrong');
      }
    } catch(e) {
      console.log(e);
    }
  };

  const editRideHandler = ride => {
    navigate('/edit-ride', { state: {
      ride: ride,
      edit: true
    }})
  };

  const renderList = () => {
    if (rides.length) {
      return (
        <>
          <Title text="Rides" />
          <SwipeableList>
            {rides.map(ride => {
              const imageUrl = ride.image ? `${process.env.REACT_APP_CMS_URL}${ride.image}` : 'https://via.placeholder.com/150?text=No+Image';
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
                  <RideCard thumbnail={imageUrl} date={ride.date} coaster={ride.coasterName} park={ride.parkName} rating={ride.rating}/>
                </SwipeableListItem>
              )
            })}
          </SwipeableList>
        </>
      )
    } else {
      return <p>You haven't recorded any rides yet</p>
    }
  };

  return <div>
    {showAlert && <Alert content={alertContent} show={showAlert} />}
    {renderList()}
    {rides.length && totalPages > 1 ? <Pager currentPage={currentPage} totalPages={totalPages} onPrevious={fetchRidesHandler} onNext={fetchRidesHandler} /> : ''}
  </div>
};

export default Rides;