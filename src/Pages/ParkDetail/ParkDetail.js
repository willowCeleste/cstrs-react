import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Title from "../../Components/Title/Title";
import RideCard from "../../Components/RideCard/RideCard";
import './ParkDetail.css';

const ParkDetail = () => {
  const { id } = useParams();
  const [park, setPark] = useState(null);

  const fetchParkHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_CMS_URL}/api/v1/park/park?id=${id}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setPark(data.park);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchParkHandler();
  }, [fetchParkHandler])

  const renderCoasterList = () => {
    if (park._coasters.length) {
      return (
        <ul>
          {park._coasters.sort((a, b) => {
            return (a.title > b.title) ? 1 : -1;
          }).map(coaster => {
            return <li key={coaster._id}>
              <Link to={`/coaster/${coaster._id}`}>
                <RideCard coaster={coaster.title} thumbnail={coaster.image ? `${process.env.REACT_APP_CMS_URL}/${coaster.image}` : ''} />
              </Link>
            </li>
          })}
        </ul>
      )
    }
  }

  return (
    <div className="c-park-detail">
      {park && (
        <div>
          <Title text={park.title} />
          {park.city && park.state && <Title text={`${park.city}, ${park.state}`} size="small" weight="thin" />}
          {renderCoasterList()}
        </div>
      )}
    </div>
  );
};

export default ParkDetail;