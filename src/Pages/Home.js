import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import RideList from '../Components/RideList/RideList';
import RideCard from '../Components/RideCard/RideCard';
import Title from '../Components/Title/Title';
import Loading from '../Components/Loading/Loading';
import Stat from '../Components/Stat/Stat';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userContext, setUserContext] = useContext(UserContext);
  const [recentRides, setRecentRides] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserHandler = useCallback(async () => {
    if (userContext.token) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/home`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Something went wrong!');
        } else {
          const data = await response.json();
          setUser(data.user);
          setRecentRides(data.recentRides);
          setStats(data.stats);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [userContext]);

  useEffect(() => {
    if (!userContext.token) {
      navigate('/login');
    }
    fetchUserHandler();
  }, [fetchUserHandler, navigate, userContext.token]);

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
 
  return loading ? <Loading /> : <div className="c-home">
    <Link to="/addRide"><button className="o-button__quick-add o-button--round">+</button></Link>
    <section>
      <Title text="Recent Rides"/>
      {renderRecentRides()}
    </section>
    <Title text="Quick Stats" /> 
    <section className="c-home__quick-stats">
      <Stat stat={stats.newCreditsForYear} text="new credits this year" />
      <Stat stat={stats.ridesThisYear} text="total rides this year" />
      <Stat stat={stats.parksThisYear} text="parks visited this year" />
    </section>
  </div>
};

export default Home;