const RideList = props => {
  return <ul className="c-ride-list">
    {props.items.map(item => <li key={item.key} className="c-ride-list__item">{item}</li>)}
  </ul>
};

export default RideList;