import { useState, useEffect, useCallback, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import RideCard from '../../Components/RideCard/RideCard';
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Loading from "../../Components/Loading/Loading";
import Title from "../../Components/Title/Title";
import Pager from "../../Components/Pager/Pager";
import "./Credits.css";

const Credits = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [credits, setCredits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  let milestone;
  let prevMilestone;

  const milestones = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

  milestones.forEach((number, index)=> {
    if (index > 0) {
      if (totalCredits >= milestones[index -1] && totalCredits < number) {
        milestone = number;
        prevMilestone = milestones[index -1];
      } 
    }
  });

  const fetchCreditsHandler = useCallback(async page => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/credits?limit=10&page=${page}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        }
      });
      if (!response.ok) {
        console.log('Something went wrong');
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setCredits(data.credits);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalCredits(data.totalCredits);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [userContext.token]);

  const renderCredits = () => {
    if (credits.length) {
      return (
        <ul className="c-credits__list">
          {credits.map(credit => {
            return (
              <li key={credit._id}>
                <RideCard 
                  key={credit._id} 
                  date={credit.firstRideDate} 
                  coaster={credit._id} park={credit.park} 
                  thumbnail={credit.image && credit.image.length ? `${process.env.REACT_APP_CMS_URL}${credit.image}` : ''} />
              </li>
            );
          })}
        </ul>
      )
    }
    return <div>No credits found! Record your first Ride to get your first credit!</div>
  };

  const renderProgress = () => {
    if (credits.length) {
      return (
        <div>
          <p className="c-credits__progress-message">You've got {totalCredits} credits! Just {milestone - totalCredits} more until {milestone}!</p>
          <ProgressBar minLabel={prevMilestone} maxLabel={milestone} max={milestone - prevMilestone} progress={totalCredits - prevMilestone} />
        </div>
      )
    }
  };

  useEffect(() => {
    fetchCreditsHandler(1);
  }, [fetchCreditsHandler]);

  return loading ? <Loading /> : (
    <div>
      <Title text="Credits" />
      {!loading && renderProgress()}
      {renderCredits()}
      {credits.length && totalPages > 1 ? <Pager currentPage={currentPage} totalPages={totalPages} onPrevious={fetchCreditsHandler} onNext={fetchCreditsHandler} /> : ''}
    </div>
  )
};

export default Credits;