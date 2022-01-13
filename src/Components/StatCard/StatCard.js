import './StatCard.css';

const StatCard = props => {
  return <div className="c-stat-card">
    <div>
      <h3 className="c-stat-card__title">{props.title}</h3>
      {props.subtitle && <h4 className="c-stat-card__subtitle">{props.subtitle}</h4>}
    </div>
    <div className="c-stat-card__value">{props.value}</div>
</div>
};

export default StatCard;