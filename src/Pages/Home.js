import { useState, useEffect, useCallback } from 'react';
import RideList from '../Components/RideList/RideList';
import RideCard from '../Components/RideCard/RideCard';
import Title from '../Components/Title/Title';
import Loading from '../Components/Loading/Loading';

const Home = props => {
  const [recentRides, setRecentRides] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const recentRidesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/60f57b4d7104b26ef6ec7a0e/rides?limit=5`); // TODO: remove hardcoded user ID
      const data = await response.json();
      setRecentRides(data.rides);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  const statsHandler = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/stats/60f57b4d7104b26ef6ec7a0e/home/`);
    const data = await response.json();
    setStats(data.data);
    try {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    recentRidesHandler()
  }, [recentRidesHandler]);

  useEffect(() => {
    statsHandler()
  }, [statsHandler]);

  const mappedRides = recentRides.map(ride => {
    const attrs = {
      key: ride._id,
      date: ride.date,
      coaster: ride.coasterName,
      park: ride.parkName
    }

    if (ride.image) {
      attrs['thumbnail'] = `${process.env.REACT_APP_CMS_URL}${ride.image}`;
    }

    if (ride.rating) {
      attrs['rating'] = ride.rating;
    }

    return <RideCard {...attrs} />;
  });

  return loading ? <Loading /> : <div>
    <Title text={`Hello ${props.user.firstName}!`}/>
    <section>
    <Title text="Recent Rides" size="small" />
      <RideList items={mappedRides} />
    </section>
    <section>
      {stats && <p>{stats.newCreditsForYear} new credits this year</p>}
      {stats && <p>{stats.ridesThisYear} total rides this year</p>}
    </section>
  </div>
};

export default Home;