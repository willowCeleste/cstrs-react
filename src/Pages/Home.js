import { useState, useEffect, useCallback } from 'react';
import RideList from '../Components/RideList/RideList';
import RideCard from '../Components/RideCard/RideCard';
import Title from '../Components/Title/Title';

const Home = props => {
  const [recentRides, setRecentRides] = useState([]);

  const recentRidesHandler = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/60f57b4d7104b26ef6ec7a0e/rides?count=5`); // TODO: remove hardcoded user ID
      const data = await response.json();
      setRecentRides(data);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    recentRidesHandler()
  }, [recentRidesHandler]);

  const mappedRides = recentRides.map(ride => {
    console.log(ride);
    const attrs = {
      key: ride.coasterId,
      date: ride.date,
      coaster: ride.coasterName,
      park: ride.parkName
    }

    if (ride.image) {
      attrs['thumbnail'] = `http://localhost:3000${ride.image}`;
    }

    if (ride.rating) {
      attrs['rating'] = ride.rating;
    }

    return <RideCard {...attrs} />;
  });

  return <div>
    {/* <h2>Hello {props.user.firstName}!</h2> */}
    <Title text={`Hello ${props.user.firstName}!`}/>
    <section>
      <h3>Recent Rides</h3>
      <RideList items={mappedRides} />
    </section>
  </div>
};

export default Home;