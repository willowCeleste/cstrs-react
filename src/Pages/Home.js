import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiActions } from '../store/ui';
import RideList from '../Components/RideList/RideList';
import RideCard from '../Components/RideCard/RideCard';
import Title from '../Components/Title/Title';
import Loading from '../Components/Loading/Loading';
import Stat from '../Components/Stat/Stat';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showLoading = useSelector(state => state.ui.showLoading);
  const username = useSelector(state => state.user.username);
  const token = useSelector(state => state.user.token );
  const [recentRides, setRecentRides] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchUserHandler = useCallback(async () => {
    if (token) {
      dispatch(uiActions.showLoading());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/home`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Something went wrong!');
        } else {
          const data = await response.json();
          setRecentRides(data.recentRides);
          setStats(data.stats);
        }
      } catch (e) {
        console.log(e);
      }
      dispatch(uiActions.hideLoading());
    }
  }, [token, dispatch]);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler, navigate]);

  const mappedRides = recentRides.map(ride => {
    const attrs = {
      key: ride._id,
      date: ride.date,
      coaster: ride.coasterName,
      park: ride.parkName
    };

    if (ride.image) {
      attrs['thumbnail'] = `${process.env.REACT_APP_CMS_URL}${ride.image}`;
    }

    if (ride.rating) {
      attrs['rating'] = ride.rating;
    }

    return <RideCard {...attrs} />;
  });

  const renderRecentRides = () => {
    return recentRides.length ? <RideList items={mappedRides} /> : <div>You haven't added any rides yet!</div>;
  };
 
  return <div className="c-home">
    { showLoading && <Loading /> }
    <Link to="/addRide"><button className="o-button__quick-add o-button--round">+</button></Link>
    <section>
      <p>Hello, {username}</p>
      <Title text="Recent Rides"/>
      {renderRecentRides()}
    </section>
    <Title text="Quick Stats" /> 
    {/* <section className="c-home__quick-stats">
      <Stat stat={stats.newCreditsForYear} text="credits" />
      <Stat stat={stats.ridesThisYear} text="total rides" />
      <Stat stat={stats.parksThisYear} text="parks visited" />
    </section> */}
  </div>
};

export default Home;