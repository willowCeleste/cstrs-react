import "./ConfirmAlert.css";

const ConfirmAlert = props => {
  const cancelHandler = () => {
    props.cancelHandler();
  };

  const confirmHandler = () => {
    props.confirmHandler();
  }

  return <div className="c-confirm-alert">
    <h3 className="c-confirm-alert__message">{props.message}</h3>
    <div className="c-confirm-alert__buttons">
      <button className="c-button" onClick={cancelHandler}>No</button>
      <button className="c-button" onClick={confirmHandler}>Yes</button>
    </div>
  </div>
};

export default ConfirmAlert;