import './Button.css';

const Button = props => {
  return <button className="c-button" type={props.type}>{props.label}</button>
};

export default Button;