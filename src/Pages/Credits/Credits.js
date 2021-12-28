import { useState, useEffect, useCallback } from "react";
import RideCard from '../../Components/RideCard/RideCard';
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Loading from "../../Components/Loading/Loading";
import "./Credits.css";

const Credits = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreditsHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/rides/credits');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setCredits(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchCreditsHandler()
  }, [fetchCreditsHandler])
  return loading ? <Loading /> : (
    <div>
      <h2>Credits</h2>
      <p className="c-credits__progress-message">You've got {credits.length} credits! Just {50 - credits.length} more until 50!</p>
      <ProgressBar max="50" progress={credits.length}></ProgressBar>
      <ul>
        {credits.map(credit => <RideCard key={credit._id} date={credit.firstRideDate} coaster={credit._id} park={credit.park} />)}
      </ul>
    </div>
  )
};

export default Credits;