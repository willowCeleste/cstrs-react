import './Button.css';

const Button = props => {
  return <button className="c-button" type={props.type} onClick={props.onClick}>{props.label}</button>
};

export default Button;