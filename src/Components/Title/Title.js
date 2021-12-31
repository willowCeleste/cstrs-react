import "./Title.css";

const Title = props => {
  return <h2 className={`c-title${props.size ? ` c-title--${props.size}` : ''}`}>{props.text}</h2>
};

export default Title;