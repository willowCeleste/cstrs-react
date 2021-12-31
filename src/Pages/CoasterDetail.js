import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import "./CoasterDetail.css";
import Title from "../Components/Title/Title";
import Button from "../Components/Button/Button";

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

  const getImageUrl = coaster => {
    const firstPart = 'http://localhost:3000';
    if (coaster.images.items.length) {
      return firstPart + coaster.images.items[0]._image[0].attachment._urls['one-half'];
    }
    return null;
  }
  
  useEffect(() => {
    fetchCoasterHandler()
  }, [fetchCoasterHandler]);

  return <div className="c-coaster-detail">
    {coaster && (
      <div className="c-coaster-detail__details">
        {getImageUrl(coaster) && <img className="c-coaster-detail__image" src={getImageUrl(coaster)} alt={`${coaster.title}`} />}
        {/* TODO: placeholder image  */}
        <Title text={coaster.title} />
        <p className="c-coaster-detail__stat">{coaster._park[0].title}</p>
        <p className="c-coaster-detail__stat">Drop - {coaster.drop} ft</p>
        <p className="c-coaster-detail__stat">Height - {coaster.height} ft</p>
        <p className="c-coaster-detail__stat">Speed - {coaster.speed} mph</p>
        <p className="c-coaster-detail__stat">Inversions - {coaster.inversions || 0}</p>
      </div>
    )}
    <div className="c-coaster-detail__buttons">
      <Link to="/addRide" state={{ coaster }}><Button label="Log a Ride"/></Link>
      <Link to="/"><Button label="Add to List"/></Link>
    </div>
  </div>;
};

export default CoasterDetail;