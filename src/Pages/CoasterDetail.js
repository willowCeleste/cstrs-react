import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';

const CoasterDetail = () => {
  const { id } = useParams();
  const [coaster, setCoaster] = useState(null);

  const fetchCoasterHandler = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/coaster/${id}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log('coaster', data);
      setCoaster(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  
  useEffect(() => {
    fetchCoasterHandler()
  }, [fetchCoasterHandler]);

  return <div>
    {coaster && (
      <div>
        <p>{coaster.title}</p>
        <p>{coaster._park[0].title}</p>
        <p>Drop - {coaster.drop} ft</p>
        <p>Height - {coaster.height} ft</p>
        <p>Speed - {coaster.speed} mph</p>
        <p>Inversions - {coaster.inversions || 0}</p>
      </div>
    )}
    <div>
      <Link to="/addRide" state={{ coaster }}>Log a Ride</Link> or <Link to="/">Add to List</Link>
    </div>
  </div>;
};

export default CoasterDetail;