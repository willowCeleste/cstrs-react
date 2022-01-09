const StatListItem = props => {
  return (
    <li className="c-stats__list-item--ordered" key={props.name}>
      <span>{props.name}</span>
      <span>{props.value}</span>
    </li>
  )
};

const StatList = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <ol className="c-stats__list">
        { props.items.map(item => <StatListItem key={item.name} name={item.name} value={item.value} />) }
      </ol>
    </div>
  )
};

export default StatList;