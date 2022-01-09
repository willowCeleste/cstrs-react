const RideList = props => {
  return <ul className="c-ride-list">
    {props.items.map(item => <li className="c-ride-list__item">{item}</li>)}
  </ul>
};

export default RideList;