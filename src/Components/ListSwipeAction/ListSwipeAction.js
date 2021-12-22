import "./ListSwipeAction.css";

const ListSwipeAction = props => {
  return <div className={`c-list-swipe-action c-list-swipe-action--${props.color} c-list-swipe-action--${props.position}`}>{props.label}</div>
};

export default ListSwipeAction;