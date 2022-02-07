import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Title from "./Title/Title";
import RideList from "./RideList/RideList";
import StatCard from "./StatCard/StatCard";
import './Stats.css';

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

  const formatAvg = number => {
    if (number % 1 === 0) {
      return number;
    } else {
      const decimalString = number.toString().split('.')[1];
      if (decimalString.length === 1) {
        return number;
      }
      return Math.round((number + Number.EPSILON) * 100) / 100;
    }
  }

  useEffect(() => {
    fetchStatsHandler();
  }, [fetchStatsHandler]);

  return (
    <div className="c-stats">
      <Title text="Stats" />
      <section>
        <div>
          <Title size="small" text="Most Ridden Coasters" weight="bold" />
          {(stats && stats.ridesByCoaster.length) && (
            <RideList items={stats.ridesByCoaster.map(item => {
              return (
                <StatCard key={item._id} title={item.name} subtitle={item.parkName} value={item.count} />
              )
            })} />
          )}
          <Title size="small" text="Parks With Most Rides" weight="bold" />
          {(stats && stats.ridesByPark.length) && (
            <RideList items={stats.ridesByPark.map(item => {
              return (
                <li key={item._id}>
                  <StatCard title={item.name} value={item.count} />
                </li>
              )
            })} />
          )}
          <Title size="small" text="Highest Average Rating" weight="bold" />
          {(stats && stats.coastersByAvgRating.length) && (
            <RideList items={stats.coastersByAvgRating.map(item => {
              return (
                <li key={item._id}>
                  <StatCard title={item.name} value={formatAvg(item.avgRating)} />
                </li>
              )
            })} />
          )}
        </div>
      </section>
    </div>
  );
}

export default Stats;