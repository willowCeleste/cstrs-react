import dayjs from 'dayjs';
import "./RideCard.css";

const RideCard = props => {
  const thumbnailUrl = props.thumbnail || 'https://via.placeholder.com/150?text=No+Image';
  const dragHandler = () => {
    console.log('dragStart');
  };

  return <div onDrag={dragHandler} className="c-ride-card">
    <img className="c-ride-card__thumbnail" src={thumbnailUrl} alt={`Roller coaster ${props.coaster}`} />
    <div className="c-ride-card__details">
      {props.date ? <time className="c-ride-card__date">{dayjs(props.date).utc().format('MM/DD/YYYY')}</time> : null}
      <h2 className="c-ride-card__title ">{props.coaster}</h2>
      <h3 className="c-ride-card__park">{props.park}</h3>
    </div>
  </div>
};

export default RideCard;