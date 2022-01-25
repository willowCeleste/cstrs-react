import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Title from "./Title/Title";
import RideList from "./RideList/RideList";
import StatCard from "./StatCard/StatCard";

const Stats = props => { 
  const [userContext, setUserContext] = useContext(UserContext);
  const [stats, setStats] = useState(null);

  const fetchStatsHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/stats`, {
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
      setStats(data.stats);
    } catch (e) {
      console.log(e);
    }
  }, [userContext.token]);

  useEffect(() => {
    fetchStatsHandler();
  }, [fetchStatsHandler]);

  return (
    <div className="c-stats">
      <Title text="Stats" />
      <section>
        <div>
          <Title size="small" text="Most Ridden Coasters" />
          {(stats && stats.ridesByCoaster.length) && (
            <RideList items={stats.ridesByCoaster.map(item => {
              return (
                <li key={item._id}><StatCard title={item.name} subtitle={item.parkName} value={item.count} /></li>
              )
            })} />
          )}
          <Title size="small" text="Parks With Most Rides" />
          {(stats && stats.ridesByPark.length) && (
            <RideList items={stats.ridesByPark.map(item => {
              return (
                <li key={item._id}>
                  <StatCard title={item.name} value={item.count} />
                </li>
              )
            })} />
          )}
          <Title size="small" text="Highest Average Rating" />
          {(stats && stats.coastersByAvgRating.length) && (
            <RideList items={stats.coastersByAvgRating.map(item => {
              return (
                <li key={item._id}>
                  <StatCard title={item.name} value={item.avgRating} />
                </li>
              )
            })} />
            // <ul>
            //   {stats.coastersByAvgRating.map(item => <li>{item.avgRating} - {item.name}</li>)}
            // </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default Stats;