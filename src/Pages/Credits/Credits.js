import { useState, useEffect, useCallback } from "react";
import RideCard from '../../Components/RideCard/RideCard';
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Loading from "../../Components/Loading/Loading";
import Title from "../../Components/Title/Title";
import Pager from "../../Components/Pager/Pager";
import "./Credits.css";

const Credits = () => {
  const [credits, setCredits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCreditsHandler = useCallback(async page => {
    try {
      const response = await fetch(`http://localhost:4000/users/60f57b4d7104b26ef6ec7a0e/credits?limit=10&page=${page}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setCurrentPage(data.data.currentPage);
      setTotalPages(data.data.totalPages);
      setCredits(data.data.credits);
      setTotalCredits(data.data.totalCredits);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const renderCredits = () => {
    if (credits.length) {
      return (
        <ul>
          {credits.map(credit => <RideCard key={credit._id} date={credit.firstRideDate} coaster={credit._id} park={credit.park} />)}
        </ul>
      )
    }
    return <div>No credits found 🙁</div>
  };

  const renderProgress = () => {
    if (credits.length) {
      return (
        <div>
          <p className="c-credits__progress-message">You've got {totalCredits} credits! Just {50 - totalCredits} more until 50!</p>
          <ProgressBar max="50" progress={totalCredits}></ProgressBar>
        </div>
      )
    }
  };

  useEffect(() => {
    fetchCreditsHandler(1)
  }, [fetchCreditsHandler])
  return loading ? <Loading /> : (
    <div>
      <Title text="Credits" />
      {renderProgress()}
      {renderCredits()}
      <Pager currentPage={currentPage} totalPages={totalPages} onPrevious={fetchCreditsHandler} onNext={fetchCreditsHandler} />
    </div>
  )
};

export default Credits;