const SimpleListItem = props => {
  return <li>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
  </li>
};

export default SimpleListItem;