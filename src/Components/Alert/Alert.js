const Alert = props => {
  return <div className="c-alert c-alert__show">{props.content || 'Alert!!'}</div>
};

export default Alert;