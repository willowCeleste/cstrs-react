const ConfirmAlert = props => {
  const cancelHandler = () => {
    props.cancelHandler();
  };

  const confirmHandler = () => {
    props.confirmHandler();
    console.log('confirm!');
  }

  return <>
    <h3>{props.message}</h3>
    <div>
      <button onClick={cancelHandler}>No</button>
      <button onClick={confirmHandler}>Yes</button>
    </div>
  </>
};

export default ConfirmAlert;