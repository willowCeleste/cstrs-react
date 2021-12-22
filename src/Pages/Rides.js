import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import RideCard from '../Components/RideCard/RideCard';
import "./Rides.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Rides = () => {
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

  useEffect(() => {
    fetchRidesHandler()
  }, [fetchRidesHandler]);

  const renderList = () => {
    if (loading) {
      return <div>Loading!</div>
    } else if (rides.length) {
      return <ul className="c-rides__list">
        {rides.map(ride => {
          const imageUrl = ride.image ? `http://localhost:3000/${ride.image}` : 'https://via.placeholder.com/150?text=No+Image';
          return <li className="c-rides__list-item" key={ride._id}>
            <Link className="c-rides__card-link" to={`/rides/${ride._id}`}>
              <RideCard thumbnail={imageUrl} date={ride.date} coaster={ride.coasterName} park={ride.parkName}/>
            </Link>
          </li>
        })}
      </ul>
    } else {
      return <p>You haven't recorded any rides yet!</p>
    }
  }

  return <div>
    {renderList()}
  </div>
};

export default Rides;