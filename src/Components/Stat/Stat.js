import "./Stat.css";

const Stat = props => {
  return (
    <div className="c-stat">
      <div className="c-stat__stat">
        <div className="c-stat__stat-inner">
          {props.stat}
        </div>
      </div>
      <span className="c-stat__text">{` ${props.text}`}</span>
    </div>
  );
};

export default Stat;